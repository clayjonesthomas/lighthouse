import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from google.appengine.api import mail

from models import Shop, Post, User, PostsEmail

import enums.EmailFrequency as EmailFrequency

def send_emails():
    for user in User.query(User.email_frequency != EmailFrequency.UNSUBSCRIBE_EMAIL):
        important_posts, unimportant_posts = get_active_posts_for_user(user)
        if important_posts or user.email_frequency == EmailFrequency.HIGH_FREQUENCY_EMAIL:
            email = _compose_email_for_user(user, important_posts, unimportant_posts)
            email.put()
            email.send()
            email.put()


def get_active_posts_for_user(user, new_only=True):
    """
    Returns currently active posts from a user's liked_shops in a tuple,
    separated by important posts and unimportant posts.
    :param user: the User to get posts for
    :param new_only: set to True if you only want posts posted since the last
    email to user
    :return: a tuple of important_posts, unimportant_posts
    """
    important_posts = []
    unimportant_posts = []
    for liked_shop_key in user.liked_shops:
        active_posts = Post.query(ndb.AND(Post.is_archived == False,
                                          Post.shop_key == liked_shop_key)).fetch()

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


SUBJECT_shop_LIMIT = 3  # TODO: decide on the number for this


def _generate_subject(important_posts, unimportant_posts):
    """ assumes >=1 of the posts is important """
    subject = "lightho.us \\\\"
    for i_post in important_posts[:SUBJECT_shop_LIMIT]:
        subject += " " + i_post.shop_key.get().name + ","

    shop_count = len(important_posts)
    if shop_count < SUBJECT_shop_LIMIT:
        for u_post in unimportant_posts:
            if shop_count >= SUBJECT_shop_LIMIT:
                subject += " +"
                break
            subject += " " + u_post.shop_key.get().name + ","
            shop_count += 1

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
                    <table style="width: 35%;margin: 0 auto;">
                      <tr>
                        <th>
                          <svg classname="logo-circle-svg" width="32px" height="32px" viewbox="0 0 69 68" version="1.1" onclick="{()">> onClick()}
                          >
                            <g id="Page-1" stroke="none" strokewidth="1" fill="#fcfcfc" fillrule="oddeven">
                              </g><g id="Artboard-Copy-15" transform="translate(-207.000000, -79.000000)" fill="#fcfcfc">
                                <path d="M240.801612,89.3821513 C235.217988,89.8840945 230.791793,94.3993668 230.424645,100.02126 L227,100.02126 L227,102.008906 L230,102.008906 L230,109.808503 L227,109.808503 L227,117.866996 C227,118.41928 227.447715,118.866996 228,118.866996 L255.538564,118.866996 C256.090849,118.866996 256.538564,118.41928 256.538564,117.866996 L256.538564,109.808503 L254,109.808503 L254,102.008906 L256.538564,102.008906 L256.538564,100.02126 L253.25285,100.02126 C252.884075,94.374463 248.420213,89.8441129 242.801612,89.3757173 L242.801612,86.9505814 L240.801612,86.9505814 L240.801612,89.3821513 Z M241,102.208691 L241,109.808503 L232,109.808503 L232,102.208691 L241,102.208691 Z M243,102.208691 L252,102.208691 L252,109.808503 L243,109.808503 L243,102.208691 Z M235.181342,147 C219.145154,144.050178 207,130.078095 207,113.286882 C207,94.3507601 222.446176,79 241.5,79 C260.553824,79 276,94.3507601 276,113.286882 C276,126.111954 268.914695,137.292388 258.422021,143.172967 L257.476785,139.451577 L235.181342,147 Z M253.573974,124.086229 L227.318607,132.975338 L225,142.103682 L255.52538,131.768903 L253.573974,124.086229 Z M241.879716,121.734375 L229.921017,121.734375 L228.795866,126.164089 L241.879716,121.734375 Z" id="Combined-Shape-Copy"></path>
                              </g>
                          </svg></th>
                        <th><a class="no-link-title" style="color: #ffffff;font-weight: normal;font-size: 25px;">lightho.us</a></th>
                      </tr>
                    </table>
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
    shop = post.shop_key.get()

    return("""
      <tr>
        <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
          <div class="sale-tile important-sale" style="background-color: #F0F0F0;padding: 10px;">
            <a href='""" + shop.website + "'>" + shop.name + "</a><div>" + post.title  + """</div>
          </div>
        </td>
      </tr>
      """)


def _generate_unimportant_post_line(post):
    shop = post.shop_key.get()
    return("<div class='other-sale'><a href='" + shop.website + "'>" + shop.name + "</a> - " + post.title + "</div>")


def send_verification_email(email, verification_url):
    body = """
    <html>
      <body style="font-family: 'Century-Gothic', sans-serif;">
        <table style="width: 100%;">
          <tr>
            <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
              <div class="header-tile" style="background-color: #003091;text-align: center;padding: 15px;">
                <table style="width: 35%;margin: 0 auto;">
                  <tr>
                    <th>
                      <a href="lightho.us">
                      <img class="header-logo-name" style="max-width: 300px;"></a>
                    </th>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;">
              <div class="body-tile" style="background-color: #f0f0f0;padding: 15px;font-size: 20px;">
                <p>
                  Welcome to 
                  <a class="no-link-text" style="font-weight: normal;font-family: 'Century-Gothic', sans-serif;color: #003091;">lightho.us</a>
                  ! To complete the sign up process, please confirm your email here:
                </p>
                <div class="verify-button" style="text-align: center;margin: 40px 0px;">
                  <a href="
                    """
    body += verification_url
    body += """
                    " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 10px 30px;">VERIFY EMAIL</a>
                </div>
                <p><3 <a class="no-link-text" style="font-weight: normal;font-family: 'Century-Gothic', sans-serif;color: #003091;">lightho.us</a> team</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>"""
    
    message = mail.EmailMessage(sender="no-reply@lightho.us", subject='Welcome to lightho.us!')
    message.to = email
    message.html = body
    message.send()


def send_forgot_password_email(email, forgot_password_url):

    body = """
    <html>
      <body style="font-family: 'Century Gothic', sans-serif;">
        <table style="width: 100%;">
          <tr>
            <td class="tile" style="display: block;max-width: 500px;margin: 3px auto;background-color: #F0F0F0;padding: 10px;">
              <p>Hey there! Click the button below to change your password. If you think you got this email by mistake, just ignore it.</p>
                <div class="verify-button" style="text-align: center;">
                  <a href="
                  """
    body += forgot_password_url
    body += """
                  " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 8px 10px;">CHANGE PASSWORD</a>
                </div>
              <p><3 <a class="no-link-text" style="font-weight: normal;">lightho.us</a> team</p>
            </td>
          </tr>
        </table>
      </body>
    </html>"""

    message = mail.EmailMessage(sender="no-reply@lightho.us", subject='lightho.us Password Recovery Email')
    message.to = email
    message.html = body
    message.send()
