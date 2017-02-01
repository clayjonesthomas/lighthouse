import jinja2
import json
import logging
from google.appengine.ext import ndb
from google.appengine.ext.webapp import template
import os

import webapp2

from webapp2_extras import auth
from webapp2_extras import sessions
from webapp2_extras.auth import InvalidAuthIdError
from webapp2_extras.auth import InvalidPasswordError


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def spawn_dummy_posts():
    for i in range(10):
        Post(title=format('test post please ignore {}'.format(i))).put()


def main():
    logging.info('in main')
    if len(Post.query().fetch(10)) <= 0:
        logging.info("spawning dummy datastore entries")
        spawn_dummy_posts()

if __name__ == "__main__":
    main()


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)

    # using _values for the time being but unsure of its spec
    # def post_json_parser(self):
    #     result = []
    #     import pdb; pdb.set_trace()
    #     result.append(dict([(p, unicode(getattr(self, p))) for p in self._values]))
    #     return result

class MainPage(webapp2.RequestHandler):

    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class Posts(webapp2.RequestHandler):

    def post(self):
        title = self.request.get('title', None)
        post = Post(title=title)
        post_key = post.put()

    def get(self):
        if len(Post.query().fetch(10)) <= 0:
            logging.info("spawning dummy datastore entries")
            spawn_dummy_posts()
        fetched_posts = [post.to_dict() for post in Post.query().fetch(10)]
        logging.info("pulling posts from the datastore")
        self.response.write(json.dumps(fetched_posts))

###################################


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

    def render_template(self, view_filename, params=None):
        if not params:
            params = {}
        user = self.user_info
        params['user'] = user
        path = os.path.join(os.path.dirname(__file__), 'views', view_filename)
        self.response.out.write(template.render(path, params))

    def display_message(self, message):
        """Utility function to display a template with a simple message."""
        params = {
            'message': message
        }
        self.render_template('message.html', params)

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


class SignupHandler(BaseHandler):

    def post(self):
        user_name = self.request.get('username')
        email = self.request.get('email')
        password = self.request.get('password')

        unique_properties = ['username']
        user_data = self.user_model.create_user(user_name,
                                                unique_properties,
                                                email_address=email,
                                                password_raw=password,
                                                verified=False)
        if not user_data[0]:  # user_data is a tuple
            self.response.write('Unable to create user for email %s because of \
                duplicate keys %s' % (user_name, user_data[1]))
            return

        user = user_data[1]
        user_id = user.get_id()

        token = self.user_model.create_signup_token(user_id)

        verification_url = self.uri_for('verification', type='v', user_id=user_id,
                                        signup_token=token, _full=True)

        self.response.write("/rest"+verification_url)


class ForgotPasswordHandler(BaseHandler):
    def get(self):
        self._serve_page()

    def post(self):
        username = self.request.get('username')

        user = self.user_model.get_by_auth_id(username)
        if not user:
            logging.info('Could not find any user entry for username %s', username)
            self.response.write('Could not find any user entry for username {}'.format(username))
            return

        user_id = user.get_id()
        token = self.user_model.create_signup_token(user_id)

        verification_url = self.uri_for('verification', type='p', user_id=user_id,
                                        signup_token=token, _full=True)

        self.response.write("/rest"+verification_url)


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

            self.response.write("user {} has had their email verified".format(user.username))
            return
        elif verification_type == 'p':
            # supply user to the page
            params = {
                'user': user,
                'token': signup_token
            }
            self.render_template('resetpassword.html', params)
        else:
            logging.info('verification type not supported')
            self.abort(404)


class LoginHandler(BaseHandler):

    def post(self):
        username = self.request.get('username')
        password = self.request.get('password')
        try:
            u = self.auth.get_user_by_password(username, password, remember=True,
                                               save_session=True)
            self.response.write('success')
        except (InvalidAuthIdError, InvalidPasswordError) as e:
            logging.info('Login failed for user %s because of %s', username, type(e))
            self.response.write('Login failed; {}'.format(e))


class LogoutHandler(BaseHandler):
    def get(self):
        self.auth.unset_session()
        self.response.write('Logout successful')


config = {
    'webapp2_extras.auth': {
        'user_model': 'models.User',
        'user_attributes': ['username']
    },
    'webapp2_extras.sessions': {
        'secret_key': ",9XgK[}5D7*-wAi0e{a)V$O83P5tL*=y17kmx8ID0!U}q?e;mH(@L'*(qOGp#1M"
    }
}


app = webapp2.WSGIApplication([
    ('/rest/reset_password', ForgotPasswordHandler),
    ('/rest/<type:v|p>/<user_id:\d+>-<signup_token:.+>', VerificationHandler),
    ('/rest/signup', SignupHandler),
    ('/rest/login', LoginHandler),
    ('/rest/posts', Posts),
    ('/.*', MainPage),
], debug=True, config=config)

