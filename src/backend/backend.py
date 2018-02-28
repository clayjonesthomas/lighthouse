import datetime
import json
import logging
import os
import re
import time

import jinja2
import webapp2
from google.appengine.ext import ndb
from webapp2_extras import auth
from webapp2_extras import sessions
from webapp2_extras.auth import InvalidAuthIdError
from webapp2_extras.auth import InvalidPasswordError

import auth_config
import enums.EmailFrequency as EmailFrequency
from email import send_verification_email, send_forgot_password_email
from models.PostsEmail import PostsEmail, get_active_posts_for_user
from models.models import Post, Shop, User, get_entity_from_url_key

# https://groups.google.com/forum/?fromgroups=#!topic/webapp2/sHb2RYxGDLc

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


# CLOUD_STORAGE_BUCKET = os.environ['CLOUD_STORAGE_BUCKET']


def populate_dummy_datastore():
    shop_keys = _spawn_dummy_shops()
    _spawn_dummy_posts(shop_keys)
    _spawn_admin()


def _spawn_admin():
    _contents = {
        'email': u'ctjones@mit.edu',
        'password': auth_config.admin_pass,
        'selectedShops': []
    }
    request_signup = webapp2.Request.blank('/rest/signup')
    request_signup.method = 'POST'
    request_signup.body = json.dumps(_contents)
    request_signup.get_response(app)


def _spawn_dummy_posts(shop_keys):
    posts = [Post(title='50% off all items on clearance',
                  shop_key=shop_keys[0],
                  likes=25074,
                  is_important=True,
                  timestamp=datetime.datetime.now() - datetime.timedelta(1)),
             Post(title='Buy any oxford on the site, get one free',
                  shop_key=shop_keys[1],
                  likes=14543,
                  is_important=True,
                  timestamp=datetime.datetime.now() - datetime.timedelta(2)),
             Post(title='$5 off the entire summer selection',
                  shop_key=shop_keys[1],
                  likes=30210,
                  timestamp=datetime.datetime.now() - datetime.timedelta(1.5)),
             Post(title='Free shipping on any order of $10 or more',
                  shop_key=shop_keys[1],
                  likes=12532,
                  is_important=False,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.4)),
             Post(title="Summer jeans moved to clearance, everything 20% off or more",
                  shop_key=shop_keys[2],
                  is_important=True,
                  likes=2664,
                  timestamp=datetime.datetime.now() - datetime.timedelta(1.9)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  is_important=True,
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1)),
             Post(title='$10 off a purchase of $100 or more',
                  shop_key=shop_keys[3],
                  likes=352,
                  timestamp=datetime.datetime.now() - datetime.timedelta(.1))
             ]
    ndb.put_multi(posts)


def _spawn_dummy_shops():
    shops = [Shop(name='American Eagle',
                  alternate_names=['ae'],
                  website='http://www.ae.com',
                  likes=0),
             Shop(name='JCrew',
                  website='http://www.jcrew.com',
                  likes=0),
             Shop(name="Levi's Jeans",
                  website='http://www.levis.com',
                  likes=0),
             Shop(name='Lulu Lemon',
                  website='http://www.lululemon.com',
                  likes=0,
                  icon_url="https://pbs.twimg.com/profile_images/552174878195859456/qaK-0pKK_400x400.jpeg"),
             Shop(name='Old Navy',
                  website='http://www.oldnavy.com',
                  likes=0)]
    return ndb.put_multi(shops)


def _spawn_dummy_email_user(shop_keys):
    # _contents = {'username': u'mflauer', 'email': u'michelle@lightho.us',
    #              'password': u'password'}
    # request_signup = webapp2.Request.blank('/rest/signup')
    # request_signup.method = 'POST'
    # request_signup.body = json.dumps(_contents)
    # response_signup = request_signup.get_response(app)
    users = [User(liked_shops=shop_keys,
                  email_frequency=EmailFrequency.UNSUBSCRIBE_EMAIL,
                  emails=[],
                  # this field usually automatically populated during account creation
                  email_address='michelle@lightho.us')]
    ndb.put_multi(users)


def _spawn_dummy_posts_for_email(shop_keys):
    email_posts = [Post(title='50% off all items on clearance',
                        shop_key=shop_keys[0],
                        timestamp=datetime.datetime.now() - datetime.timedelta(1),
                        is_important=True),
                   Post(title='Buy any oxford on the site, get one free',
                        shop_key=shop_keys[1],
                        timestamp=datetime.datetime.now() - datetime.timedelta(2),
                        is_important=True),
                   Post(title='$5 off the entire summer selection',
                        shop_key=shop_keys[1],
                        timestamp=datetime.datetime.now() - datetime.timedelta(1.5),
                        is_important=False)]
    return ndb.put_multi(email_posts)


# Original Source: https://github.com/abahgat/webapp2-user-accounts
def user_required(handler):
    """
      Decorator that checks if there's a user associated with the current session.
      Will also fail if there's no session present.
    """

    def check_login(self, *args, **kwargs):
        auth = self.auth
        if not auth.get_user_by_session():
            self.redirect_to('login_page')
        else:
            return handler(self, *args, **kwargs)

    return check_login


def guest_required(handler):

    def check_guest(self, *args, **kwargs):
        auth = self.auth
        if not auth.get_user_by_session():
            return handler(self, *args, **kwargs)
        else:
            self.redirect_to('settings')

    return check_guest


def moderator_required(handler):

    def check_moderator(self, *args, **kwargs):
        auth = self.auth
        u = auth.get_user_by_session()
        if u:
            user = auth.store.user_model.get_by_id(u['user_id'])
            if user and user.is_moderator:
                return handler(self, *args, **kwargs)
        self.redirect_to('home')

    return check_moderator


def handle_shop_change_for_admin(shops_to_add, shops_to_remove):
    for shop_key in shops_to_add:
        shop = shop_key.get()
        shop.likes += 1
        shop.put()
        if shop.likes == 1:
            admin = User.query(User.email_address == "ctjones@mit.edu").fetch(1)[0]
            admin.liked_shops.append(shop.key)
            admin.put()

    for shop_key in shops_to_remove:
        shop = shop_key.get()
        shop.likes -= 1
        shop.put()
        if shop.likes == 0:
            admin = User.query(User.email_address == "ctjones@mit.edu").fetch(1)[0]
            admin.liked_shops.remove(shop.key)
            admin.put()


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
        return self.session_store.get_session(backend="datastore", max_age=None)

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


class MainPage(BaseHandler):

    def get(self, *args):
        user_id = None
        if self.user:
            user_id = self.user.key.urlsafe()
        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.write(template.render(user_id=user_id))


class UsersOnlyMainPage(BaseHandler):

    @user_required
    def get(self):
        user_id = self.user.key.urlsafe()
        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.write(template.render(user_id=user_id))


class GuestsOnlyPage(BaseHandler):
    
    @guest_required
    def get(self):
        if not os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
            # development, otherwise prod
            if not User.query().fetch(1):
                populate_dummy_datastore()
                time.sleep(2)  # hack to prevent this from running more than once

        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.write(template.render())


class ModeratorsOnlyPage(BaseHandler):

    @moderator_required
    def get(self):
        user_id = self.user.key.urlsafe()
        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.write(template.render(user_id=user_id))


class Feed(BaseHandler):
    def get(self, offset, _should_get_all_posts):
        user = self.user
        # convert from '0' or '1' to True or False
        should_get_all_posts = bool(int(_should_get_all_posts))
        raw_posts = self._get_posts(user, should_get_all_posts, int(offset))
        fetched_posts = [post.prepare_post(user) for post in raw_posts]
        logging.info("pulling posts from the datastore, {}".format(str(len(fetched_posts))))
        self.response.write(json.dumps(fetched_posts))

    @staticmethod
    def _get_posts(user, should_get_all_posts, offset):
        if not should_get_all_posts and user:
            liked_shop_keys = user.liked_shops
            if liked_shop_keys:
                query = Post.query(ndb.AND(Post.shop_key.IN(liked_shop_keys),
                                           Post.is_archived == False))
            else:
                return []
        else:
            query = Post.query(Post.is_archived == False)
        ordered_posts = query.order(-Post.timestamp)
        result = ordered_posts.fetch(10, offset=offset)
        # result = filter_archived_posts.fetch(19, offset=offset)
        return result


class MyPosts(BaseHandler):
    def get(self, offset):
        user = self.user
        if not user:
            return
        _offset = int(offset)
        fetched_posts = [post_key.get().prepare_post(user)
                         for post_key in user.liked_posts[_offset:_offset + 10]]
        logging.info("pulling liked posts from the datastore, {}".format(str(len(fetched_posts))))
        self.response.write(json.dumps(fetched_posts))


class SinglePost(BaseHandler):
    def post(self):
        user = self.user
        if not user:
            return
        body = json.loads(self.request.body)
        shops = body['shops']
        title = body['title']
        is_important = body['isImportant']

        if not shops or not title:
            self.response.write(json.dumps({
                'error': 'VALIDATION_ERROR',
                'isShopsValid': shops is True,
                'isTitleValid': title is True
            }))
        post_keys = []
        for shop in shops:
            post = Post(title=title,
                        is_important=is_important,
                        shop_key=ndb.Key(urlsafe=shop['key']),
                        author=ndb.Key(urlsafe=self.user.key.urlsafe()))
            post_keys.append(post.put().urlsafe())
        self.response.write(json.dumps({'keys': post_keys}))

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

        shop = get_entity_from_url_key(post_dict['shop_key'])
        post_dict['shop'] = {
            'name': shop.name,
            'website': shop.website,
            'key': shop.key.urlsafe()
        }
        self.response.write(json.dumps(post_dict))

    def delete(self, url_key):
        user = self.user
        post = ndb.Key(urlsafe=url_key).get()
        if user and (user.key == post.author or user.is_moderator):
            post.key.delete()
        self.response.write(json.dumps({'great': 'success'}))


class Posts(BaseHandler):
    def post(self):
        user = self.user
        if not user or not user.is_moderator:
            return

        body = json.loads(self.request.body)
        title = body['title']
        selected_shops = body['selectedShops']
        is_important = body['isImportant']

        for shop in selected_shops:
            shop_key = ndb.Key(urlsafe=shop['key'])
            post = Post(title=title,
                        shop_key=shop_key,
                        author=user.key,
                        is_important=is_important)
            post.put()
        self.response.write(json.dumps({'success': 'true'}))


class ArchivePost(BaseHandler):
    def post(self):
        user = self.user
        if not user or not user.is_moderator:
            return
        body = json.loads(self.request.body)
        post_key = body['key']
        post = ndb.Key(urlsafe=post_key).get()
        post.is_archived = not post.is_archived
        post.put()
        self.response.write(json.dumps({'success': True}))


class LikePost(BaseHandler):
    def post(self):
        user = self.user
        if not user:
            return
        body = json.loads(self.request.body)
        post = get_entity_from_url_key(body['key'])
        if post.key in user.liked_posts:
            user.liked_posts.remove(post.key)
            post.likes -= 1
        else:
            user.liked_posts.append(post.key)
            post.likes += 1
        user.put()
        post.put()


class Shops(BaseHandler):
    def get(self):
        user = self.user
        fetched_shops = [shop.prepare_shop(user)
                         for shop in Shop.query()]
        logging.info("pulling shops from the datastore, {}".format(str(len(fetched_shops))))
        self.response.write(json.dumps({'shops': fetched_shops}))


class NotMyShops(BaseHandler):
    # currently gets shops a user doesn't want
    def get(self):
        user = self.user
        if not user:
            return
        fetched_shops = [shop.prepare_shop(user)
                         for shop in Shop.query()]
        fetched_shops = list(filter((lambda s: ndb.Key(urlsafe=s['key'])
                                               not in user.liked_shops),
                                    fetched_shops))
        logging.info("pulling shops from the datastore, {}".format(str(len(fetched_shops))))
        self.response.write(json.dumps({'shops': fetched_shops}))


class MyShops(BaseHandler):
    def get(self):
        user = self.user
        if not user:
            return
        fetched_shops = [shop_key.get().prepare_shop(user)
                         for shop_key in user.liked_shops]
        logging.info("pulling shops from the datastore, {}".format(str(len(fetched_shops))))
        self.response.write(json.dumps(fetched_shops))  # included in state as "displayedShops"


class UserData(BaseHandler):

    def get(self):
        user = self.user

        if not user:
            self.response.write(json.dumps({
                'error': 'NO_USER_ERROR'
            }))
            return

        email_frequency = user.email_frequency

        self.response.write(json.dumps({
            'email': user.email_address,
            'isVerified': user.verified,
            'isModerator': user.is_moderator,
            'myShops': user.jsonable_liked_shops,
            'emailFrequency': email_frequency,
        }))


class UserEmail(BaseHandler):

    def get(self):
        user = self.user

        if not user:
            self.response.write(json.dumps({
                'error': 'NO_USER_ERROR'
            }))
            return

        email = user.email_address
        email_for_cookie = email.replace('@', '~')

        self.response.set_cookie('email_cookie', email_for_cookie, max_age=3600*24*7, path='/')
        self.response.write(json.dumps({
            'email': email,
        }))


class ShopPosts(BaseHandler):
    def get(self, url_key, offset):
        user = self.user
        shop = ndb.Key(urlsafe=url_key).get()
        shop_posts_query = Post.query(Post.shop_key == shop.key)
        unarchived_posts_query = shop_posts_query.filter(Post.is_archived == False)
        posts = unarchived_posts_query.fetch(10, offset=int(offset))
        ordered_posts = Post.order_posts(posts)
        prepared_posts = [post.prepare_post(user) for post in ordered_posts]
        self.response.write(json.dumps(prepared_posts))


class LikeShop(BaseHandler):
    def post(self):
        user = self.user
        if not user:
            return
        body = json.loads(self.request.body)
        shops = []
        if 'key' in body:
            shops = [ndb.Key(urlsafe=body['key']).get()]
        if 'keys' in body:
            shops = [ndb.Key(urlsafe=key).get()
                     for key in body['keys']]

        for shop in shops:
            if shop.key in user.liked_shops:
                user.liked_shops.remove(shop.key)
                shop.likes -= 1
            else:
                user.liked_shops.append(shop.key)
                shop.likes += 1
            shop.put()
        user.put()
        shops = [shop.prepare_shop(user) for shop in shops]
        self.response.write(json.dumps(shops))


class LikeShops(BaseHandler):
    def post(self):
        user = self.user
        if not user:
            return
        body = json.loads(self.request.body)
        selected_shops = []
        if 'key' in body:
            selected_shops = [ndb.Key(urlsafe=body['key']).get()]
        if 'keys' in body:
            selected_shops = [ndb.Key(urlsafe=key).get()
                              for key in body['keys']]

        for shop in selected_shops:
            if shop.key not in user.liked_shops:
                user.liked_shops.append(shop.key)
                shop.likes += 1
                shop.put()

        original_liked_shops = [ndb.Key(urlsafe=liked_key.urlsafe()).get() for liked_key in user.liked_shops]
        for original_liked_shop in original_liked_shops:
            if original_liked_shop not in selected_shops:  # they no longer want this shop included in their liked shops
                user.liked_shops.remove(original_liked_shop.key)
                original_liked_shop.likes -= 1
                original_liked_shop.put()

        user.put()

        shops = [shop.prepare_shop(user) for shop in selected_shops]
        self.response.write(json.dumps(shops))


class SingleShop(BaseHandler):
    def get(self, url_key):
        shop = get_entity_from_url_key(url_key)
        shop_dict = shop.to_dict()
        shop_dict['timestamp'] = shop_dict['timestamp'].isoformat(' ')
        # do a query to get posts associated with the shop

        user = self.user
        if user:
            shop_dict['isLiked'] = shop.key in user.liked_shops
        else:
            shop_dict['isLiked'] = False

        self.response.write(json.dumps({'shop': shop_dict}))

    def post(self):
        user = self.user
        if not user or not user.is_moderator:
            return
        body = json.loads(self.request.body)
        alternate_name_string = body['alternateNames']
        alt_names = [name for name in alternate_name_string.split(",")]
        if user and user.is_moderator:
            shop = Shop(
                name=body['name'],
                website=body['site'],
                alternate_names=alt_names
                # icon_url=body['icon_url']
            )
            shop.put()
            self.response.write(json.dumps({'success': True}))

    def delete(self, url_key):
        user = self.user
        if not user or not user.is_moderator:
            return
        ndb.Key(urlsafe=url_key).delete()


class EditShop(BaseHandler):
    def post(self):
        user = self.user
        body = json.loads(self.request.body)

        if user and user.is_moderator:
            shop_key = body['key']
            shop = ndb.Key(urlsafe=shop_key).get()
            shop.name = body['name']
            shop.website = body['website']
            shop.icon_url = body['icon_url']
            shop.put()
            self.response.write(json.dumps({'key': shop_key}))


class SignupHandler(BaseHandler):
    def post(self):
        body = json.loads(self.request.body)
        email = body['email'].lower()
        password = body['password']
        shops = body['selectedShops']
        is_password_valid = len(password) >= 6
        # won't work because of unsupported GAE modules
        # is_email_valid = validate_email(email, verify=True)
        is_email_valid = bool(re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email))
        are_shops_valid = True
        for shop in shops:
            try:
                ndb.Key(urlsafe=shop['key']).get()
            except (KeyError, AttributeError):
                are_shops_valid = False

        if (not is_password_valid or not is_email_valid
            or not are_shops_valid):
            self.response.write(json.dumps({
                'error': 'VALIDATION_ERROR',
                'isEmailValid': is_email_valid,
                'isPasswordValid': is_password_valid,
                'areShopsValid': are_shops_valid
            }))
            return

        shop_keys = [ndb.Key(urlsafe=shop['key']) for shop in shops]
        unique_properties = ['email_address']
        is_moderator = False
        if email == 'clay@lightho.us' or email == "ctjones@mit.edu" or email == 'michelle@lightho.us':  # even worse
            is_moderator = True
        user_data = self.user_model.create_user(email,
                                                unique_properties,
                                                email_address=email,
                                                password_raw=password,
                                                verified=False,
                                                is_moderator=is_moderator,
                                                email_frequency=EmailFrequency.MID_FREQUENCY_EMAIL,
                                                liked_shops=shop_keys)
        if not user_data[0]:  # user_data is a tuple
            logging.info('Unable to create user for email %s because of '
                         'duplicate keys %s' % (email, user_data[1]))
            self.response.write(json.dumps({'invalidEmail': email}))
            return

        user = user_data[1]
        user_id = user.get_id()

        token = self.user_model.create_signup_token(user_id)
        verification_url = self.uri_for('verification', type='v', user_id=user_id,
                                        signup_token=token, _full=True)
        if not is_moderator:
            send_verification_email(email, verification_url, JINJA_ENVIRONMENT)
        logging.info('Email verification link: %s', verification_url)

        self.auth.set_session(self.auth.store.user_to_dict(user), remember=True)
        handle_shop_change_for_admin(shop_keys, [])
        self.response.write(json.dumps({
            'email': self.user.email_address,
            'isVerified': True,
            'isModerator': self.user.is_moderator,
            'myShops': self.user.jsonable_liked_shops,
            'myEmailFrequency': self.user.email_frequency
        }))


class ForgotPasswordHandler(BaseHandler):
    def post(self):
        body = json.loads(self.request.body)
        email = body['email'].lower()

        user = self.user_model.get_by_auth_id(email)
        if not user:
            logging.info('Could not find any user entry for email %s', email)
            self.response.write(json.dumps({
                'error': 'NO_EMAIL_FOUND',
                'email': email,
            }))
            return

        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        u = self.user_model.get_by_auth_id(email)
        u.toggle_login(enable=False)
        u.put()
        forgot_password_url = self.uri_for('verification', type='p', user_id=user_id,
                                           signup_token=token, _full=True)

        logging.info("forgot password url: " + forgot_password_url)
        self.response.write(json.dumps({'email': email}))
        send_forgot_password_email(email, forgot_password_url, JINJA_ENVIRONMENT)


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
            self.redirect_to('verification_success')
        elif verification_type == 'p':
            self.redirect('/new_password/' + user.email_address + '/' + signup_token)
        elif verification_type == 'u':
            user.email_frequency = EmailFrequency.UNSUBSCRIBE_EMAIL
            user.put()
            self.redirect_to('settings')
            self.user_model.delete_signup_token(user.get_id(), signup_token)
        elif verification_type == 's':
            self.redirect_to('settings')
            self.user_model.delete_signup_token(user.get_id(), signup_token)
        elif verification_type == 'f':
            self.redirect_to('/')  # TODO: fill in with eventual feed url
            self.user_model.delete_signup_token(user.get_id(), signup_token)
        else:
            logging.info('verification type not supported')
            self.abort(404)

    def post(self):
        """just for updating passwords"""

        user = None
        body = json.loads(self.request.body)
        email = body['email'].lower()
        signup_token = body['signupToken']
        new_password = body['password']

        matching_users = self.user_model.query(self.user_model.email_address == email).fetch(1)
        if matching_users:
            user_id = matching_users[0].key.id()
        else:
            self.response.write(json.dumps({'error': 'AUTH_EMAIL_ERROR'}))
            return
        user, timestamp = self.user_model.get_by_auth_token(int(user_id), signup_token,
                                                            'signup')
        if not user:
            logging.info('Could not find any user with email "%s" and signup token "%s"',
                         email, signup_token)
            self.response.write(json.dumps({'error': 'AUTH_KEY_ERROR'}))
            return

        # store user data in the session
        self.auth.set_session(self.auth.store.user_to_dict(user), remember=True)

        self.user_model.delete_signup_token(user.get_id(), signup_token)
        user.set_password(new_password)
        user.toggle_login(enable=True)
        user.put()
        self.response.write(json.dumps({'success': 'PASSWORD_UPDATED'}))
        

class ResendVerificationHandler(BaseHandler):
    def post(self):
        user = self.user
        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        verification_url = self.uri_for('verification', type='v', user_id=user_id,
                                        signup_token=token, _full=True)
        send_verification_email(user.email_address, verification_url, JINJA_ENVIRONMENT)
        self.response.write(json.dumps({'success': 'RESENT_VERIFICATION'}))


class LoginHandler(BaseHandler):
    def post(self):
        body = json.loads(self.request.body)
        email = body['email'].lower()
        password = body['password']

        try:
            user_dict = self.auth.get_user_by_password(email, password, remember=True, save_session=True)
            user = self.user_model.get_by_id(user_dict['user_id'])

            if user.verified:
                if user.is_login_enabled:
                    self.response.write(json.dumps({
                        'email': user.email_address,
                        'isVerified': True,
                        'isModerator': user.is_moderator,
                        'myShops': user.jsonable_liked_shops,
                        'myEmailFrequency': user.email_frequency
                    }))
                else:
                    logging.info('Login failed for user %s because they reset their password', email)
                    self.response.write(json.dumps({'error': 'PASSWORD_RESET_ERROR'}))
            else:
                # this still logs the user in
                logging.info('Login succeeded for user %s, but they are unverified', email)
                self.response.write(json.dumps({
                    'email': user.email_address,
                    'isVerified': False,
                    'isModerator': user.is_moderator,
                    'myShops': user.jsonable_liked_shops,
                    'myEmailFrequency': user.email_frequency
                }))
        except (InvalidAuthIdError, InvalidPasswordError) as e:
            logging.info('Login failed for user %s because of %s', email, type(e))
            self.response.write(json.dumps({'error': 'AUTHENTICATION_ERROR'}))


class LogoutHandler(BaseHandler):
    def get(self):
        self.auth.unset_session()
        self.response.delete_cookie('email_cookie', path='/')
        self.response.write(json.dumps('Logout successful'))


class EmailHandler(BaseHandler):
    def post(self):
        # admin has email service enabled
        if not os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
            dummy_shops = _spawn_dummy_shops()
            dummy_posts = _spawn_dummy_posts_for_email(dummy_shops)
            _spawn_dummy_email_user(dummy_shops)

        for user in User.query(User.email_frequency != EmailFrequency.UNSUBSCRIBE_EMAIL):
            user_id = user.get_id()
            token = self.user_model.create_signup_token(user_id)
            unsubscribe_url = self.uri_for('verification',
                                           type='u',
                                           user_id=user_id,
                                           signup_token=token,
                                           _full=True)
            settings_url = self.uri_for('verification',
                                        type='s',
                                        user_id=user_id,
                                        signup_token=token,
                                        _full=True)
            feed_page_url = self.uri_for('verification',
                                         type='f',
                                         user_id=user_id,
                                         signup_token=token,
                                         _full=True)

            important_posts, unimportant_posts = get_active_posts_for_user(user)
            send_just_unimportant = user.email_frequency == EmailFrequency.HIGH_FREQUENCY_EMAIL and unimportant_posts

            if important_posts or send_just_unimportant:
                email = PostsEmail(to=user.key,
                                   important_posts=important_posts,
                                   unimportant_posts=unimportant_posts,
                                   unsubscribe_url=unsubscribe_url,
                                   settings_url=settings_url,
                                   feed_page_url=feed_page_url)
                email.compose_email_for_user(JINJA_ENVIRONMENT)
                email.send()

        self.response.write(json.dumps({'success': 'EMAIL_SENT'}))


class SettingsHandler(BaseHandler):

    def post(self):
        body = json.loads(self.request.body)
        selected_shops = body['selectedShops']
        email_frequency = body['emailFrequency']

        user = self.user
        if not user:
            return

        shop_keys = [ndb.Key(urlsafe=shop['key']) for shop in selected_shops]

        shops_to_remain = set(shop_keys).intersection(user.liked_shops)
        shops_to_remove = set(user.liked_shops) - shops_to_remain
        shops_to_add = set(shop_keys) - shops_to_remain
        handle_shop_change_for_admin(shops_to_add, shops_to_remove)

        user.liked_shops = shop_keys
        user.email_frequency = email_frequency
        user.put()
        self.response.write(json.dumps({'success': 'SETTINGS_UPDATED'}))


class TrackedShopsHandler(BaseHandler):

    def get(self):
        user = self.user
        if not user:
            return
        shops = []
        for shop_key in user.liked_shops:
            shop_dict = shop_key.get().prepare_shop(user)
            shop_dict['active_posts'] = []
            active_posts = Post.query(ndb.AND(Post.is_archived == False,
                                              Post.shop_key == shop_key))
            for active_post in active_posts:
                shop_dict['active_posts'].append({
                    'title': active_post.title,
                    'key': active_post.key.urlsafe(),
                    'isImportant': active_post.is_important
                })

            shops.append(shop_dict)

        self.response.write(json.dumps({'shops': shops}))


class RedirectToShop(BaseHandler):

    def get(self, *args, **kwargs):
        user = None
        user_id = kwargs['user_id']  # urlsafe key
        shop_id = kwargs['shop_id']

        redirect_url = ndb.Key(urlsafe=shop_id).get().website

        template = JINJA_ENVIRONMENT.get_template('templates/redirect.html')
        self.response.write(template.render(
            user_id=user_id,
            url=redirect_url
        ))


class SendTestVerificationEmailToMod(BaseHandler):

    @moderator_required
    def get(self):
        user = self.user
        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        verification_url = self.uri_for('verification', type='v', user_id=user_id,
                                        signup_token=token, _full=True)
        send_verification_email(user.email_address, verification_url, JINJA_ENVIRONMENT)
        self.response.write(json.dumps({"success": True}))


class SendTestForgotPassEmailToMod(BaseHandler):

    @moderator_required
    def get(self):
        user = self.user
        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        forgot_password_url = self.uri_for('verification', type='p', user_id=user_id,
                                           signup_token=token, _full=True)
        send_forgot_password_email(user.email_address, forgot_password_url, JINJA_ENVIRONMENT)
        self.response.write(json.dumps({"success": True}))


class SendTestPostsEmailToMod(BaseHandler):

    @moderator_required
    def get(self):
        user = self.user
        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)
        unsubscribe_url = self.uri_for('verification',
                                       type='u',
                                       user_id=user_id,
                                       signup_token=token,
                                       _full=True)
        settings_url = self.uri_for('verification',
                                    type='s',
                                    user_id=user_id,
                                    signup_token=token,
                                    _full=True)

        important_posts, unimportant_posts = self._get_random_posts()
        email = PostsEmail(to=user.key,
                           important_posts=important_posts,
                           unimportant_posts=unimportant_posts,
                           unsubscribe_url=unsubscribe_url,
                           settings_url=settings_url)
        email.compose_email_for_user(JINJA_ENVIRONMENT)
        email.send()
        self.response.write(json.dumps({"success": True}))

    @staticmethod
    def _get_random_posts():
        important_posts = Post.query().fetch(2)
        important_post_keys = [i.key for i in important_posts]
        unimportant_posts = Post.query().fetch(4)
        unimportant_post_keys = [u.key for u in unimportant_posts]
        return important_post_keys, unimportant_post_keys


config = {
    'webapp2_extras.auth': {
        'user_model': 'backend.models.models.User',
        'user_attributes': [],  # used for caching properties
        # default is 1814400, 86400, 3600
        'token_max_age': 86400 * 365,  # amount of seconds in a day * 1 year of days
        # for some reason this also functions like token_max_age in that it
        # logs out users after the time period is up instead of doing what it
        # should do, namely issuing a new cookie. Ideally, this should be limited
        # to ~1 day for security reasons.
        'token_new_age': 86400 * 365,
        'token_cache_age': 3600

    },
    'webapp2_extras.sessions': {
        'secret_key': auth_config.secret_key
    }
}

app = webapp2.WSGIApplication([
    webapp2.Route('/rest/reset_password', ForgotPasswordHandler, name='forgot'),
    webapp2.Route('/rest/p', VerificationHandler, name='verification_pass'),
    webapp2.Route('/rest/<type:v|p|u|s|l|f>/<user_id:\d+>-<signup_token:.+>', VerificationHandler, name='verification'),
    webapp2.Route('/rest/signup', SignupHandler, name='signup'),
    webapp2.Route('/rest/login', LoginHandler, name='login'),
    webapp2.Route('/rest/logout', LogoutHandler, name='logout'),
    webapp2.Route('/rest/settings', SettingsHandler, name='settings'),
    webapp2.Route('/rest/resend_verification', ResendVerificationHandler, name='resend_verification'),

    webapp2.Route('/rest/posts/<offset:[0-9]*>-<_should_get_all_posts:[0-1]>', Feed, name='feed'),
    webapp2.Route('/rest/posts', Posts, name='posts'),
    webapp2.Route('/rest/post/like', LikePost, name='like_post'),
    webapp2.Route('/rest/post/archive', ArchivePost, name='archive_post'),
    webapp2.Route('/rest/post', SinglePost, name='single_post_post'),
    webapp2.Route('/rest/post/<url_key:.*>', SinglePost, name='single_post'),
    webapp2.Route('/rest/my_shops', MyShops, name='my_shops'),
    webapp2.Route('/rest/user_data', UserData, name='user_data'),
    webapp2.Route('/rest/user_email', UserEmail, name='user_email'),
    webapp2.Route('/rest/not_my_shops', NotMyShops, name='not_my_shops'),
    webapp2.Route('/rest/shops', Shops, name='shops'),
    webapp2.Route('/rest/shops/like', LikeShops, name='like_shops'),
    webapp2.Route('/rest/shop/like', LikeShop, name='like_shop'),
    # webapp2.Route('/rest/shop/icon/<url_key:.*>', AddIconToShop, name='single_shop'),
    webapp2.Route('/rest/shop/edit', EditShop, name='edit_shop'),
    webapp2.Route('/rest/shop', SingleShop, name='single_shop'),
    webapp2.Route('/rest/shop/posts/<url_key:[a-zA-Z0-9-_]*>/<offset:[0-9]*>', ShopPosts, name='single_shop'),
    webapp2.Route('/rest/shop/<url_key:.*>', SingleShop, name='single_shop'),
    # webapp2.Route('/rest/shop_img/<url_key:.*>', ShopImage, name='shop_image'),
    # webapp2.Route('/rest/shop_img', ShopImage, name='shop_image'),
    webapp2.Route('/rest/my_posts/<offset:[0-9]*>', MyPosts, name='my_posts'),
    webapp2.Route('/rest/email', EmailHandler, name='email'),
    webapp2.Route('/rest/tracked_shops', TrackedShopsHandler, name='tracked_shops'),

    webapp2.Route('/shop_link/<user_id:[a-zA-Z0-9-_]*>/<shop_id:[a-zA-Z0-9-_]*>', RedirectToShop, name='redirect_shop'),
    webapp2.Route('/verification_success', MainPage, name='verification_success'),
    webapp2.Route('/new_password/<:[^/]*>/<:.*>', MainPage, name='new_password'),
    webapp2.Route('/reset_password', MainPage, name='reset_password'),
    webapp2.Route('/new_password_success', MainPage, name='new_password_success'),
    webapp2.Route('/settings', UsersOnlyMainPage, name='settings'),
    webapp2.Route('/welcome', UsersOnlyMainPage, name='welcome'),
    webapp2.Route('/signup', GuestsOnlyPage, name='signup_page'),
    webapp2.Route('/login', GuestsOnlyPage, name='login_page'),
    webapp2.Route('/', GuestsOnlyPage, name='landing_page'),
    webapp2.Route('/verified', MainPage, name='verified'),
    webapp2.Route('/privacy_policy', MainPage, name='privacy_policy'),
    webapp2.Route('/my_feed', MainPage, name='my_feed'),
    webapp2.Route('/new', MainPage, name='new'),
    webapp2.Route('/shops', MainPage, name='shops'),
    webapp2.Route('/posts', MainPage, name='posts'),
    webapp2.Route('/post/<:.*>', MainPage, name='single_post_view'),
    webapp2.Route('/shop/<:.*>', MainPage, name='single_shop_view'),
    webapp2.Route('/admin/script', SendTestPostsEmailToMod, name='script_runner'),
    webapp2.Route('/admin/new_shop', ModeratorsOnlyPage, name='new_shop_page'),
    webapp2.Route('/admin/tracked_shops', ModeratorsOnlyPage, name='tracked_shops_page'),
    webapp2.Route('/admin', ModeratorsOnlyPage, name='admin_page'),
    webapp2.Route('/', MainPage, name='home'),
    webapp2.Route('/<:.*>', MainPage, name='home_redirect'),
], debug=True, config=config)
