import time
import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb

from webapp2_extras import security

def get_entity_from_url_key(url_key):
    return ndb.Key(urlsafe=url_key).get()


class Comment(ndb.Model):
    body = ndb.TextProperty()
    author_user_key = ndb.KeyProperty()
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    likes = ndb.IntegerProperty(indexed=True, default=0)
    child_comments = ndb.KeyProperty(indexed=True, kind='Comment', repeated=True)
    comment_amount = ndb.IntegerProperty(indexed=True, default=0)

    def add_child_comment(self, comment):
        self.comment_amount += comment.comment_amount + 1
        self.comment_amount.append(comment.key)


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)
    store_key = ndb.KeyProperty(indexed=True, kind='Store')
    likes = ndb.IntegerProperty(indexed=True, default=0)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    top_comments = ndb.KeyProperty(indexed=True, kind='Comment', repeated=True)
    comment_amount = ndb.IntegerProperty(indexed=True, default=0)
    author = ndb.KeyProperty(indexed=True, kind='User')

    def add_top_comment(self, comment):
        self.comment_amount += 1
        self.top_comments.append(comment.key)


class Store(ndb.Model):
    name = ndb.StringProperty(indexed=True)
    website = ndb.StringProperty(indexed=False)
    likes = ndb.IntegerProperty(indexed=True, default=0)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)


class User(webapp2_extras.appengine.auth.models.User):
    # Source: https://github.com/abahgat/webapp2-user-accounts

    def __init__(self, *args, **kwargs):
        super(self.__class__, self).__init__(*args,**kwargs)
        self._is_login_enabled = True

    def set_password(self, raw_password):
        """Sets the password for the current user

        :param raw_password:
            The raw password which will be hashed and stored
        """
        self.password = security.generate_password_hash(raw_password, length=12)

    @classmethod
    def get_by_auth_token(cls, user_id, token, subject='auth'):
        """Returns a user object based on a user ID and token.

        :param user_id:
            The user_id of the requesting user.
        :param token:
            The token string to be verified.
        :returns:
            A tuple ``(User, timestamp)``, with a user object and
            the token timestamp, or ``(None, None)`` if both were not found.
        """
        token_key = cls.token_model.get_key(user_id, subject, token)
        user_key = ndb.Key(cls, user_id)
        # Use get_multi() to save a RPC call.
        valid_token, user = ndb.get_multi([token_key, user_key])
        if valid_token and user:
            timestamp = int(time.mktime(valid_token.created.timetuple()))
            return user, timestamp

        return None, None

    @property
    def username(self):
        """
        :returns: the username of the user
        """
        return self.auth_ids[0]

    @property
    def is_login_enabled(self):
        """
        :return: whether or not the user can be logged in
        """
        return self._is_login_enabled

    def toggle_login(self, **kwargs):
        """
        disable or enable whether or not a user can login
        :param kwargs: enable: evaluates to True if the user can login,
            False if not.
        """
        should_enable = kwargs['enable']

        if should_enable is not None:
            if should_enable:
                self._is_login_enabled = True
            else:
                self._is_login_enabled = False
        else:
            self._is_login_enabled = not self._is_login_enabled

    @classmethod
    def get_by_id(cls, user_id):
        # definitely a more concise way to do this
        user_key = ndb.Key(cls, user_id)
        return user_key.get()
