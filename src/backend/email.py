import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from models import Store, Post, User, PostsEmail


def send_emails():
    for user in User.query(User.using_email_service == True):
        important_posts, unimportant_posts = get_active_posts_for_user(user)
        if important_posts:
            email = _compose_email_for_user(user, important_posts, unimportant_posts)
            email.put()
            email.send()
            email.put()


def get_active_posts_for_user(user, new_only=True):
    """
    Returns currently active posts from a user's liked_stores in a tuple,
    separated by important posts and unimportant posts.
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
            elif len(user.emails) == 0 or post.timestamp > user.emails[-1].timestamp:
                if post.is_important:
                    important_posts.append(post)
                else:
                    unimportant_posts.append(post)
    
    return important_posts, unimportant_posts


def _compose_email_for_user(user, important_posts, unimportant_posts):
    body = _generate_body(important_posts, unimportant_posts)
    subject = _generate_subject(important_posts, unimportant_posts)

    important_post_keys = [p.key for p in important_posts]
    unimportant_post_keys = [p.key for p in unimportant_posts]
    email = PostsEmail(body=body,
                       to=user.key,
                       subject=subject,
                       important_posts=important_post_keys,
                       unimportant_posts=unimportant_post_keys)
    return email


SUBJECT_STORE_LIMIT = 3  # TODO: decide on the number for this


def _generate_subject(important_posts, unimportant_posts):
    """ assumes >=1 of the posts is important """
    subject = "lightho.us \\\\"
    for i_post in important_posts:
        subject += " " + i_post.shop_key.get().name + ","

    store_count = len(important_posts)
    if store_count < SUBJECT_STORE_LIMIT:
        for u_post in unimportant_posts:
            if store_count >= SUBJECT_STORE_LIMIT:
                subject += " +"
                break
            subject += " " + u_post.shop_key.get().name + ","
            store_count += 1

    if subject[-1] == ",":
        subject = subject[:-1]

    return subject


def _generate_body(important_posts, unimportant_posts):
    body = ""
    for i_post in important_posts:
        body += _generate_post_line(i_post, bold=True)
        body += "\n"

    body += "\n Other Sales: \n"
    for u_post in unimportant_posts:
        body += _generate_post_line(u_post, bold=False)
        body += "\n"

    body += "\n\n love,\n<a href=\"lightho.us\">lightho.us</a>"
    return body


def _generate_post_line(post, bold=False):
    store = post.shop_key.get()
    if bold:
        beginning_tags = "<b><a href=\"" + store.website + "\">"
        closing_tags = "</a></b>"
    else:
        beginning_tags = "<a href=\"" + store.website + "\">"
        closing_tags = "</a>"
    sale_info = store.name + ": " + post.title
    return beginning_tags + sale_info + closing_tags

