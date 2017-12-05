import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from models import Store, Post, User, PostsEmail


def send_emails():
    for user in User.query(User.using_email_service == True):
        important_posts, unimportant_posts = get_posts_for_user(user)
        if important_posts:
            email = compose_email_for_user(user, important_posts, unimportant_posts)
            email.send()
            email.put()


def get_posts_for_user(user, new_only=True):
    """
    Returns the posts in a tuple, separated by important posts and unimportant
    posts.
    :param user: the User to get posts for
    :param new_only: set to True if you only want posts posted since the last
    email to user
    :return: a tuple of important_posts, unimportant_posts
    """
    important_posts = []
    unimportant_posts = []
    for liked_store_key in user.liked_stores:
        liked_store = liked_store_key.get()
        for post_key in liked_store.active_posts:
            post = post_key.get()
            if not new_only:
                if post.is_important:
                    important_posts.append(post)
                else:
                    unimportant_posts.append(post)
            elif post.timestamp > user.emails[-1].timestamp:
                if post.is_important:
                    important_posts.append(post)
                else:
                    unimportant_posts.append(post)
    return important_posts, unimportant_posts


def compose_email_for_user(user, posts):
    body = generate_body(posts)
    subject = generate_subject(posts)
    email = PostsEmail(body=body,
                       to=user.key,
                       subject=subject,
                       posts=posts)
    return email


SUBJECT_STORE_LIMIT = 3  # TODO: decide on the number for this


def generate_subject(important_posts, unimportant_posts):
    """ assumes >=1 of the posts is important """
    subject = "lightho.us \\\\"
    for post in important_posts:
        subject += " " + post.store_key.get().name + ","

    store_count = len(important_posts)
    if store_count < SUBJECT_STORE_LIMIT:
        for post in unimportant_posts:
            if store_count >= SUBJECT_STORE_LIMIT:
                subject += " +"
                break
            subject += " " + post.store_key.get().name + ","
            store_count += 1

    if subject[-1] == ",":
        subject = subject[:-1]

    return subject


def generate_body(posts):
    important_posts = []
    unimportant_posts = []
    for post in posts:
        if post.is_important:
            important_posts.append(post)
        else:
            unimportant_posts.append(post)
