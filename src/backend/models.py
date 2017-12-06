from webapp2_extras import auth
import time
import datetime
import logging
import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from google.appengine.api import mail

from webapp2_extras import security
from webapp2_extras import auth


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


class PostNoShopException(Exception):
    def __init__(self):
        Exception.__init__(self, "New posts must have a shop key.")


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)
    shop_key = ndb.KeyProperty(indexed=True, kind='Store')
    likes = ndb.IntegerProperty(indexed=True, default=1)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    top_comments = ndb.KeyProperty(indexed=True, kind='Comment', repeated=True)
    comment_amount = ndb.IntegerProperty(indexed=True, default=0)
    author = ndb.KeyProperty(indexed=True, kind='User')
    # TODO: is_archived
    isArchived = ndb.BooleanProperty(indexed=True, default=False)
    is_important = ndb.BooleanProperty(indexed=True, default=False)

    def __init__(self, *args, **kwargs):
        if not kwargs.get("isArchived"):
            shop_key = kwargs.get("shop_key")
            if shop_key:
                shop = shop_key.get()
                shop.active_posts.append(self)
                shop.put()
            else:
                raise PostNoShopException()

        super(Post, self).__init__(*args, **kwargs)

    def add_top_comment(self, comment):
        self.comment_amount += 1
        self.top_comments.append(comment.key)

    @staticmethod
    def order_posts(posts):
        return sorted(posts, key=lambda post: post.likes/(post.shop_key.get().likes + 1))

    def prepare_post(self, user):
        post_dictionary = self.to_dict()
        # currently not actually supporting multiple shops on a post
        post_dictionary['shop'] = self.shop_key.get().to_dict()
        del post_dictionary['shop']['timestamp']
        del post_dictionary['shop_key']
        post_dictionary['shop_key'] = self.shop_key.urlsafe()
        post_dictionary['timestring'] = self._prepare_timestring()
        del post_dictionary['timestamp']
        post_dictionary['key'] = self.key.urlsafe()
        del post_dictionary['author']
        if self.author != None:
            post_dictionary['author'] = self.author.urlsafe()
            post_dictionary['author_username'] = self.author.get().username

        if user:
            post_dictionary['isLiked'] = self.key in user.liked_posts
            post_dictionary['canDelete'] = user.is_moderator
            if self.author:
                post_dictionary['canDelete'] = user.key == self.author
        else:
            post_dictionary['isLiked'] = False
            post_dictionary['canDelete'] = False

        return post_dictionary

    def _prepare_timestring(self):
        diff = datetime.datetime.now() - self.timestamp
        if diff.days > 0:
            if diff.days > 365 + 183:
                return str(int(round(diff.days/365))) + " years ago"
            if diff.days > 365:
                return "a year ago"
            if diff.days > 30 + 15:
                return str(int(round(diff.days/30.5))) + " months ago"
            if diff.days > 30:
                return "a month ago"
            if diff.days > 7 + 3:
                return str(int(round(diff.days/7))) + " weeks ago"
            if diff.days > 7:
                return "a week ago"
            if diff.days > 1:
                return str(int(diff.days)) + " days ago"
            return "1 day ago"
        else:
            if diff.seconds > 86400 + 43200:
                return str(int(round(diff.seconds/86400))) + " days ago"
            if diff.seconds > 86400:
                return "a day ago"
            if diff.seconds > 3600 + 1800:
                return str(int(round(diff.seconds/3600))) + " hours ago"
            if diff.seconds > 3600:
                return "an hour ago"
            if diff.seconds > 60 + 30:
                return str(int(round(diff.seconds/60))) + " minutes ago"
            if diff.seconds > 60:
                return "a minute ago"
            return "just now"


# TODO: rename shop
class Store(ndb.Model):
    name = ndb.StringProperty(indexed=True)
    website = ndb.StringProperty(indexed=False)
    likes = ndb.IntegerProperty(indexed=True, default=1)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    icon_url = ndb.StringProperty(indexed=False)
    _active_posts = ndb.KeyProperty(indexed=False, repeated=True)

    def prepare_shop(self, user):
        shop_dict = self.to_dict()
        shop_dict['key'] = self.key.urlsafe()
        shop_dict['timestamp'] = shop_dict['timestamp'].isoformat(' ')

        if user:
            shop_dict['isLiked'] = self.key in user.liked_stores
            shop_dict['canDelete'] = user.is_moderator
        else:
            shop_dict['isLiked'] = False
            shop_dict['canDelete'] = False

        return shop_dict

    @property
    def active_posts(self):
        for active_post in self._active_posts:
            if active_post.isArchived:
                self._active_posts.remove(active_post)
                self.put()
        return self._active_posts


class User(webapp2_extras.appengine.auth.models.User):
    # Source: https://github.com/abahgat/webapp2-user-accounts

    # outdated naming, should be liked_shops, but will need to update prod datastore for that
    liked_stores = ndb.KeyProperty(indexed=True, kind='Store', repeated=True)
    liked_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    is_moderator = ndb.BooleanProperty(indexed=True, default=False)
    using_email_service = ndb.BooleanProperty(indexed=True, default=False)
    # must be in order from earliest to latest email
    emails = ndb.KeyProperty(indexed=False, kind='PostsEmail', repeated=True)

    def __init__(self, *args, **kwargs):
        super(self.__class__, self).__init__(*args, **kwargs)
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


class PostsEmail(ndb.Model):

    body = ndb.StringProperty(indexed=False)
    to = ndb.KeyProperty(indexed=True, kind='User')
    subject = ndb.StringProperty(indexed=False)
    important_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    unimportant_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    has_been_sent = ndb.BooleanProperty(indexed=False, default=False)

    def send(self):
        message = mail.EmailMessage(sender="michelle@lightho.us", subject=self.subject)
        message.to = self.to
        message.body = self.body
        message.send()
        receiving_user = message.to.get()
        receiving_user.emails.append(self.key())
        receiving_user.put()
        self.has_been_sent = True
