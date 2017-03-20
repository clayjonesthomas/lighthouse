import time
import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb

from webapp2_extras import security


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)

    # using _values for the time being but unsure of its spec
    # def post_json_parser(self):
    #     result = []
    #     import pdb; pdb.set_trace()
    #     result.append(dict([(p, unicode(getattr(self, p))) for p in self._values]))
    #     return result


class User(webapp2_extras.appengine.auth.models.User):
    # Source: https://github.com/abahgat/webapp2-user-accounts
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

    def get_username(self):
        """
        :returns: the username of the user
        """
        return self.auth_ids[0]

    @classmethod
    def get_by_id(cls, user_id):
        # definitely a more concise way to do this
        user_key = ndb.Key(cls, user_id)
        return user_key.get()
