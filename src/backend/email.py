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
        active_posts = Post.query(ndb.AND(Post.isArchived == False,
                                          Post.shop_key == liked_store_key)).fetch()

        for post in active_posts:
            if not new_only:
                if post.is_important:
                    important_posts.append(post)
                else:
                    unimportant_posts.append(post)
            elif len(user.emails) == 0 or post.timestamp > user.emails[-1].get().timestamp:
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
    body = """
        <html>
          <body style="font-family: 'Century Gothic', sans-serif;">
            <table style="width: 100%;">
              <tr>
                <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
                  <div class="header-tile" style="background-color: #003091;text-align: center;padding: 10px;font-size: 24px;">
                    <a style="color: #ffffff;">lightho.us</a>
                  </div>
                </td>
              </tr>"""

    for i_post in important_posts:
        body += _generate_important_post_tile(i_post)
        body += "\n"

    body += """      
      <tr>
        <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
          <div class="sale-tile" style="background-color: #F0F0F0;padding: 10px;">
            <div class="other-sales-title" style="text-align: center;font-size: 18px;">Other Sales</div>"""

    for u_post in unimportant_posts:
        body += _generate_unimportant_post_line(u_post)
        body += "\n"

    body += """</div>
            </td>
          </tr>
        </table>
      </body>
    </html>"""

    return body


def _generate_important_post_tile(post):
    store = post.shop_key.get()

    return("""
      <tr>
        <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
          <div class="sale-tile important-sale" style="background-color: #F0F0F0;padding: 10px;">
            <a href='""" + store.website + "'>" + store.name + "</a><div>" + post.title  + """</div>
          </div>
        </td>
      </tr>
      """)

def _generate_unimportant_post_line(post):
    store = post.shop_key.get()
    return("<div class='other-sale'><a href='" + store.website + "'>" + store.name + "</a> - " + post.title + "</div>")

