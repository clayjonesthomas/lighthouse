import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from models import Store, Post, User, PostsEmail


def send_emails():
    for user in User.query(User.using_email_service == True):
        if does_user_qualify_for_email(user):
            posts = get_posts_for_user(user)
            email = compose_email_for_user(user, posts)
            email.send()
            email.put()


def does_user_qualify_for_email(user):
    return len(get_posts_for_user(user, important_only=True)) > 0


def get_posts_for_user(user, new_only=True, important_only=False):
    posts = []
    for liked_store_key in user.liked_stores:
        liked_store = liked_store_key.get()
        for post in liked_store.active_posts:
            if not new_only:
                if important_only and post.is_important:
                    posts.append(post)
                else:
                    posts.append(post)
            elif post.timestamp > user.emails[-1].timestamp:
                if important_only and post.is_important:
                    posts.append(post)
                else:
                    posts.append(post)
    return posts


def compose_email_body_for_user(user):
    pass
