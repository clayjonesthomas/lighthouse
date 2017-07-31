from google.appengine.ext import ndb
from google.appengine.api import images
import jinja2
import json
import logging
import os
import datetime

import webapp2

from webapp2_extras import auth
from webapp2_extras import sessions
from webapp2_extras.auth import InvalidAuthIdError
from webapp2_extras.auth import InvalidPasswordError

from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

# https://groups.google.com/forum/?fromgroups=#!topic/webapp2/sHb2RYxGDLc
from google.appengine.ext import deferred

from models import Post, Store, get_entity_from_url_key


from google.appengine.api import app_identity
import lib.cloudstorage as gcs

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

CLOUD_STORAGE_BUCKET = os.environ['CLOUD_STORAGE_BUCKET']


def populate_dummy_datastore():
    store_keys = _spawn_dummy_stores()
    _spawn_dummy_posts(store_keys)
    _spawn_admin()


def _spawn_admin():
    _contents = {'username': 'admin', 'email': 'ctjones@mit.edu',
                 'password': '32hereford'}
    request_signup = webapp2.Request.blank('/rest/signup', POST=_contents)
    response_signup = request_signup.get_response(app)

    request_verify = webapp2.Request.blank(response_signup.body)
    request_verify.method = 'GET'

    response_verify = request_verify.get_response(app)


def _spawn_dummy_posts(store_keys):
    posts = [Post(title='50% off all items on clearance',
                  shop_key=store_keys[0],
                  likes=25074,
                  timestamp=datetime.datetime.now()-datetime.timedelta(1)),
             Post(title='Buy any oxford on the site, get one free',
                  shop_key=store_keys[1],
                  likes=14543,
                  timestamp=datetime.datetime.now()-datetime.timedelta(2)),
             Post(title='$5 off the entire summer selection',
                  shop_key=store_keys[1],
                  likes=30210,
                  timestamp=datetime.datetime.now()-datetime.timedelta(1.5)),
             Post(title='Free shipping on any order of $10 or more',
                  shop_key=store_keys[1],
                  likes=12532,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.4)),
             Post(title="Summer jeans moved to clearance, everything 20% off or more",
                  shop_key=store_keys[2],
                  likes=2664,
                  timestamp=datetime.datetime.now()-datetime.timedelta(1.9)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=store_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now()-datetime.timedelta(.1))
             ]
    ndb.put_multi(posts)


def _spawn_dummy_stores():
    stores = [Store(name='American Eagle',
                    website='www.ae.com',
                    likes=302470),
              Store(name='JCrew',
                    website='www.jcrew.com',
                    likes=493218),
              Store(name="Levi's Jeans",
                    website='www.levis.com',
                    likes=124341),
              Store(name='Lulu Lemon',
                    website='www.lululemon.com',
                    likes=295831),
              Store(name='Old Navy',
                    website='www.oldnavy.com',
                    likes=324319)]
    return ndb.put_multi(stores)


# Original Source: https://github.com/abahgat/webapp2-user-accounts
def user_required(handler):
    """
      Decorator that checks if there's a user associated with the current session.
      Will also fail if there's no session present.
    """
    def check_login(self, *args, **kwargs):
        auth = self.auth
        if not auth.get_user_by_session():
            self.redirect(self.uri_for('login'), abort=True)
        else:
            return handler(self, *args, **kwargs)

    return check_login


class BaseHandler(webapp2.RequestHandler):
    @webapp2.cached_property
    def auth(self):
        """Shortcut to access the auth instance as a property."""
        return auth.get_auth()

    @webapp2.cached_property
    def user_info(self):
        """Shortcut to access a subset of the user attributes that are stored
        in the session.

        The list of attributes to store in the session is specified in
          config['webapp2_extras.auth']['user_attributes'].
        :returns
          A dictionary with most user information
        """
        return self.auth.get_user_by_session()

    @webapp2.cached_property
    def user(self):
        """Shortcut to access the current logged in user.

        Unlike user_info, it fetches information from the persistence layer and
        returns an instance of the underlying model.

        :returns
          The instance of the user model associated to the logged in user.
        """
        u = self.user_info
        return self.user_model.get_by_id(u['user_id']) if u else None

    @webapp2.cached_property
    def user_model(self):
        """Returns the implementation of the user model.

        It is consistent with config['webapp2_extras.auth']['user_model'], if set.
        """
        return self.auth.store.user_model

    @webapp2.cached_property
    def session(self):
        """Shortcut to access the current session."""
        return self.session_store.get_session(backend="datastore")

    # def render_template(self, view_filename, params=None):
    #     if not params:
    #         params = {}
    #     user = self.user_info
    #     params['user'] = user
    #     path = os.path.join(os.path.dirname(__file__), 'views', view_filename)
    #     self.response.out.write(template.render(path, params))

    # this is needed for webapp2 sessions to work
    def dispatch(self):
        # Get a session store for this request.
        self.session_store = sessions.get_store(request=self.request)

        try:
            # Dispatch the request.
            webapp2.RequestHandler.dispatch(self)
        finally:
            # Save all sessions.
            self.session_store.save_sessions(self.response)


class MainPage(webapp2.RequestHandler):

    def get(self, *args):
        if not Post.query().fetch(10):
            populate_dummy_datastore()
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class Feed(BaseHandler):

    def get(self, offset):
        user = self.user
        raw_posts = self._get_posts(user, int(offset))
        fetched_posts = [post.prepare_post(user) for post in raw_posts]
        logging.info("pulling posts from the datastore, {}".format(str(len(fetched_posts))))
        self.response.write(json.dumps(fetched_posts))

    @staticmethod
    def _get_posts(user, offset):
        if user:
            liked_store_keys = user.liked_stores
            if liked_store_keys:
                three_days_ago = datetime.datetime.today() - datetime.timedelta(days=3)
                query = Post.query(Post.shop_key.IN(liked_store_keys))
                filter_old_posts = query.filter(Post.timestamp >= three_days_ago)
                result = filter_old_posts.fetch(10, offset=offset)
                ordered_result = Post.order_posts(result)
                return ordered_result
            return []
        return Post.query().fetch(10, offset=offset)


class MyPosts(BaseHandler):

    def get(self, offset):
        user = self.user
        _offset = int(offset)
        fetched_posts = []
        if user:
            fetched_posts = [post_key.get().prepare_post(user)
                             for post_key in user.liked_posts[_offset:_offset+10]]
            logging.info("pulling liked posts from the datastore, {}".format(str(len(fetched_posts))))
        self.response.write(json.dumps(fetched_posts))


class SinglePost(BaseHandler):

    def post(self):
        body = json.loads(self.request.body)
        shops = body['shops']
        if shops:
            post_keys = []
            for shop in shops:
                post = Post(title=body['title'],
                            shop_key=ndb.Key(urlsafe=shop['key']))
                post_keys.append(post.put().urlsafe())
            self.response.write(json.dumps({'keys': post_keys}))
        else:
            logging.info("post without a shop tried to save itself")
            self.response.write("a post needs a shop")

    def get(self, url_key):
        post = get_entity_from_url_key(url_key)
        post_dict = post.to_dict()
        comment_keys = [comment.urlsafe() for comment in post_dict.top_comments]

        post_dict['top_comments'] = comment_keys
        user = self.user
        if user:
            post_dict['isLiked'] = post.key in user.liked_posts
        else:
            post_dict['isLiked'] = False

        store = get_entity_from_url_key(post_dict['store_key'])
        post_dict['store'] = {
            'name': store.name,
            'website': store.website,
            'key': store.key.urlsafe()
        }
        self.response.write(json.dumps(post_dict))

    def delete(self, url_key):
        user = self.user
        post = ndb.Key(urlsafe=url_key).get()
        if user and (user.key == post.author or user.is_moderator):
            post.key.delete()
        self.response.write(json.dumps({'great': 'success'}))


class LikePost(BaseHandler):
    def post(self):
        body = json.loads(self.request.body)
        post = get_entity_from_url_key(body['key'])
        user = self.user
        if user:
            if post.key in user.liked_posts:
                user.liked_posts.remove(post.key)
                post.likes -= 1
            else:
                user.liked_posts.append(post.key)
                post.likes += 1
            user.put()
            post.put()


class Stores(BaseHandler):

    def get(self):
        user = self.user
        fetched_stores = [store.prepare_store(user) for store in Store.query()]
        logging.info("pulling stores from the datastore, {}".format(str(len(fetched_stores))))
        self.response.write(json.dumps({'shops': fetched_stores}))


class MyStores(BaseHandler):

    def get(self):
        user = self.user
        fetched_stores = []
        if user:
            fetched_stores = [store_key.get().prepare_store(user)
                              for store_key in user.liked_stores]
            logging.info("pulling stores from the datastore, {}".format(str(len(fetched_stores))))
        self.response.write(json.dumps(fetched_stores))


class StorePosts(BaseHandler):

    def get(self, url_key, offset):
        user = self.user
        store = ndb.Key(urlsafe=url_key).get()
        posts = Post.query(Post.shop_key == store.key).fetch(10, offset=int(offset))
        ordered_posts = Post.order_posts(posts)
        prepared_posts = [post.prepare_post(user) for post in ordered_posts]
        self.response.write(json.dumps(prepared_posts))


class LikeStore(BaseHandler):

    def post(self):
        body = json.loads(self.request.body)
        stores = []
        if 'key' in body:
            stores = [ndb.Key(urlsafe=body['key']).get()]
        if 'keys' in body:
            stores = [ndb.Key(urlsafe=key).get()
                      for key in body['keys']]
        user = self.user
        if user:
            # stupid amount of ifs here, but we dont want a user to
            # remove stores they add in a group on accident. We should
            # probably send only unliked stores in this case or something
            if len(stores) > 1:
                for store in stores:
                    user.liked_stores.append(store.key)
                    store.likes += 1
                    store.put()
            else:
                # is this what it means, what it means to hack
                for store in stores:
                    if store.key in user.liked_stores:
                        user.liked_stores.remove(store.key)
                        store.likes -= 1
                    else:
                        user.liked_stores.append(store.key)
                        store.likes += 1
                    store.put()
            user.put()
            stores = [store.prepare_store(user) for store in stores]
            self.response.write(json.dumps(stores))


class SingleStore(BaseHandler):

    def get(self, url_key):
        store = get_entity_from_url_key(url_key)
        store_dict = store.to_dict()
        store_dict['timestamp'] = store_dict['timestamp'].isoformat(' ')
        # do a query to get posts associated with the store

        user = self.user
        if user:
            store_dict['isLiked'] = store.key in user.liked_stores
        else:
            store_dict['isLiked'] = False

        self.response.write(json.dumps({'store': store_dict}))

    def post(self):
        user = self.user
        body = json.loads(self.request.body)
        if user and user.is_moderator:
            store = Store(
                name=body['name'],
                website=body['website']
            )
            store_key = store.put()
            self.response.write(json.dumps({'key': store_key.urlsafe()}))

    def delete(self, url_key):
        user = self.user
        if user and user.is_moderator:
            ndb.Key(urlsafe=url_key).delete()


class AddIconToStore(BaseHandler):
    '''
    under severe construction, don't use unless you
    figure out what the fuck is going on with python
    gcs
    '''
    def get(self, url_key):
        blob_key = ndb.key(urlsafe=url_key)
        img = images.Image(blob_key=blob_key)
        img.resize(width=64, height=64)
        img.execute_transforms(output_encoding=images.JPEG)

        self.response.headers['Content-Type'] = 'image/jpeg'
        self.response.out.write(img)

    def post(self, url_key):
        user = self.user
        if user and user.is_moderator:
            icon = self.request.get('icon')
            # storage_client = gcs.Client()
            # bucket = storage_client.get_bucket(CLOUD_STORAGE_BUCKET)
            # blob = bucket.blob(url_key)  # url_key used here as the filename
            #
            # blob.upload_from_string(
            #     icon,
            #     content_type='image/jpeg'
            # )
            #
            # store = ndb.Key(urlsafe=url_key)
            # store.icon_url = blob.public_url
            # store_key = store.put()
            gcs.blob
            file = gcs.open(
                url_key,
                'w',
                content_type='image/jpeg'
            )
            file.write(icon)
            file.close()
            self.response.write(json.dumps({'key': url_key}))


class StoreUrl(BaseHandler, blobstore_handlers.BlobstoreUploadHandler):
    '''
        under severe construction, don't use unless you
        figure out what the fuck is going on with python
        gcs
        '''
    def get(self):
        upload_url = blobstore.create_upload_url('/upload_photo')
        self.response.write(json.dumps({'upload_url': upload_url}))


class SignupHandler(BaseHandler):

    def post(self):
        user_name = self.request.get('username')
        email = self.request.get('email')
        password = self.request.get('password')
        unique_properties = ['email_address']  # username automatically unique
        is_moderator = False
        if self.request.get('username') == 'admin':
            is_moderator = True
        user_data = self.user_model.create_user(user_name,
                                                unique_properties,
                                                email_address=email,
                                                password_raw=password,
                                                verified=False,
                                                is_moderator=is_moderator)
        if not user_data[0]:  # user_data is a tuple
            self.response.write('Unable to create user for username %s because of '
                                'duplicate keys %s' % (user_name, user_data[1]))
            return

        user = user_data[1]
        user_id = user.get_id()

        token = self.user_model.create_signup_token(user_id)
        verification_url = self.uri_for('verification', type='v', user_id=user_id,
                                        signup_token=token, _full=True)

        self.response.write(verification_url)


class ForgotPasswordHandler(BaseHandler):
    def post(self):
        username = self.request.get('username')

        user = self.user_model.get_by_auth_id(username)
        if not user:
            logging.info('Could not find any user entry for username %s', username)
            self.response.write('Could not find any user entry for username {}'.format(username))
            return

        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        u = self.user_model.get_by_auth_id(username)
        u.toggle_login(enable=False)
        u.put()
        verification_url = self.uri_for('verification', type='p', user_id=user_id,
                                        signup_token=token, _full=True)

        self.response.write(verification_url)


class VerificationHandler(BaseHandler):
    def get(self, *args, **kwargs):
        user = None
        user_id = kwargs['user_id']
        signup_token = kwargs['signup_token']
        verification_type = kwargs['type']

        # it should be something more concise like
        # self.auth.get_user_by_token(user_id, signup_token)
        # unfortunately the auth interface does not (yet) allow to manipulate
        # signup tokens concisely
        user, timestamp = self.user_model.get_by_auth_token(int(user_id), signup_token,
                                                            'signup')

        if not user:
            logging.info('Could not find any user with id "%s" signup token "%s"',
                         user_id, signup_token)
            self.abort(404)

        # store user data in the session
        self.auth.set_session(self.auth.store.user_to_dict(user), remember=True)
        if verification_type == 'v':
            # remove signup token, we don't want users to come back with an old link
            self.user_model.delete_signup_token(user.get_id(), signup_token)

            if not user.verified:
                user.verified = True
                user.put()
            # very fragile way to grab the username, should be changed if more advanced
            # auth_ids usage needed
            self.response.write("user {} has had their email verified".format(user.username))
            return
        else:
            logging.info('verification type not supported')
            self.abort(404)

    def post(self, *args, **kwargs):
        user = None
        user_id = kwargs['user_id']
        signup_token = kwargs['signup_token']
        verification_type = kwargs['type']
        new_password = self.request.get('password')

        # it should be something more concise like
        # self.auth.get_user_by_token(user_id, signup_token)
        # unfortunately the auth interface does not (yet) allow to manipulate
        # signup tokens concisely
        user, timestamp = self.user_model.get_by_auth_token(int(user_id), signup_token,
                                                            'signup')

        if not user:
            logging.info('Could not find any user with id "%s" signup token "%s"',
                         user_id, signup_token)
            self.abort(404)

        # store user data in the session
        self.auth.set_session(self.auth.store.user_to_dict(user), remember=True)

        if verification_type == 'p':
            self.user_model.delete_signup_token(user.get_id(), signup_token)
            user.set_password(new_password)
            user.toggle_login(enable=True)
            user.put()
            self.response.write("user {} has had their password updated".format(user.username))
        else:
            logging.info('verification type not supported')
            self.abort(404)


class LoginHandler(BaseHandler):

    def post(self):
        body = json.loads(self.request.body)
        username = body['username']
        password = body['password']
        try:
            user_dict = self.auth.get_user_by_password(username, password, remember=True, save_session=True)
            user = self.user_model.get_by_id(user_dict['user_id'])

            if user.verified:
                if user.is_login_enabled:
                    self.response.write(json.dumps({'username': self.user.username}))
                else:
                    logging.info('Login failed for user %s because they reset their password', username)
                    self.response.write('Login failed; {}'.format('login attempted during password reset'))
            else:
                logging.info('Login failed for user %s because they are unverified', username)
                self.response.write('Login failed; {}'.format('unverified'))
        except (InvalidAuthIdError, InvalidPasswordError) as e:
            logging.info('Login failed for user %s because of %s', username, type(e))
            self.response.write('Login failed; bad username or password')

    def get(self):
        """
        lowkey just used to ensure a user is logged in after verification,
        but likely will be used in the future to pull login data
        """
        if self.auth.get_user_by_session():
            self.response.write(json.dumps({
                'username': self.user.username,
                'isModerator': self.user.is_moderator
            }))
        else:
            self.response.write(json.dumps({'logged_in': False}))


class LogoutHandler(BaseHandler):
    def get(self):
        self.auth.unset_session()
        self.response.write(json.dumps('Logout successful'))


config = {
    'webapp2_extras.auth': {
        'user_model': 'backend.models.User',
        'user_attributes': [] # used for caching properties
    },
    'webapp2_extras.sessions': {
        'secret_key': ",9XgK[}5D7*-wAi0e{a)V$O83P5tL*=y17kmx8ID0!U}q?e;mH(@L'*(qOGp#1M"
    }
}


app = webapp2.WSGIApplication([
    webapp2.Route('/rest/reset_password', ForgotPasswordHandler, name='forgot'),
    webapp2.Route('/rest/<type:v|p>/<user_id:\d+>-<signup_token:.+>', VerificationHandler, name='verification'),
    webapp2.Route('/rest/signup', SignupHandler, name='signup'),
    webapp2.Route('/rest/login', LoginHandler, name='login'),
    webapp2.Route('/rest/logout', LogoutHandler, name='logout'),

    webapp2.Route('/rest/posts', Feed, name='feed'),
    webapp2.Route('/rest/posts/<offset:[0-9]*>', Feed, name='feed'),
    webapp2.Route('/rest/post/like', LikePost, name='like_post'),
    webapp2.Route('/rest/post', SinglePost, name='single_post_post'),
    webapp2.Route('/rest/post/<url_key:.*>', SinglePost, name='single_post'),
    webapp2.Route('/rest/my_shops', MyStores, name='my_shops'),
    webapp2.Route('/rest/shops', Stores, name='shops'),
    webapp2.Route('/rest/store/like', LikeStore, name='like_store'),
    # webapp2.Route('/rest/store/icon/<url_key:.*>', AddIconToStore, name='single_store'),
    webapp2.Route('/rest/store', SingleStore, name='single_store'),
    webapp2.Route('/rest/store/posts/<url_key:[a-zA-Z0-9-_]*>/<offset:[0-9]*>', StorePosts, name='single_store'),
    webapp2.Route('/rest/store/<url_key:.*>', SingleStore, name='single_store'),
    # webapp2.Route('/rest/store_img/<url_key:.*>', StoreImage, name='store_image'),
    # webapp2.Route('/rest/store_img', StoreImage, name='store_image'),
    webapp2.Route('/rest/my_posts/<offset:[0-9]*>', MyPosts, name='my_posts'),



    webapp2.Route('/new', MainPage, name='new'),
    webapp2.Route('/shops', MainPage, name='stores'),
    webapp2.Route('/posts', MainPage, name='posts'),
    webapp2.Route('/post/<:.*>', MainPage, name='single_post_view'),
    webapp2.Route('/store/<:.*>', MainPage, name='single_store_view'),
    webapp2.Route('/<:.*>', MainPage, name='home'),
], debug=True, config=config)
