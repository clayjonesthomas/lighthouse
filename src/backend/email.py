import webapp2_extras.appengine.auth.models

from google.appengine.ext import ndb
from google.appengine.api import mail

from models import Shop, Post, User, PostsEmail

import enums.EmailFrequency as EmailFrequency


def send_email_to_user(user, unsubscribe_url, settings_url):
    important_posts, unimportant_posts = get_active_posts_for_user(user)
    send_just_unimportant = user.email_frequency == EmailFrequency.HIGH_FREQUENCY_EMAIL and unimportant_posts
    if important_posts or send_just_unimportant:
        email = _compose_email_for_user(user, important_posts, unimportant_posts, unsubscribe_url, settings_url)
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


def _compose_email_for_user(user, important_posts, unimportant_posts, unsubscribe_url, settings_url):
    user_id = user.key.urlsafe()
    body = _generate_body(user_id, important_posts, unimportant_posts, unsubscribe_url, settings_url)
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


def _generate_body(user_id, important_posts, unimportant_posts, unsubscribe_url, settings_url):
    body = """
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat" rel="stylesheet">
          </head>
          <body style="font-family: 'Roboto', sans-serif;">
            <table style="width: 100%;min-width: 400px;">
              <tr>
                <td style="display: block;max-width: 500px;margin: 3px auto;">
                  <div style="background-color: #003091;text-align: center;padding: 10px;font-size: 24px;">
                    <table style="width: 35%;margin: 0 auto;">
                      <tr>
                        <th>
                          <a href="lightho.us">
                          <img style="max-width: 300px;" src="https://lightho.us/blue_logo.png" alt="lightho.us logo"></a>
                        </th>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>"""

    for i_post in important_posts:
        body += _generate_important_post_tile(user_id, i_post)
        body += "\n"

    if unimportant_posts:
        body += """      
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #F0F0F0;padding: 10px;">"""
        if important_posts:
            """<div style="text-align: center;font-size: 18px;">Other Sales</div>"""

        for u_post in unimportant_posts:
            body += _generate_unimportant_post_line(user_id, u_post)
            body += "\n"

        body += "</div>"

    body += _generate_footer_line(unsubscribe_url, settings_url)

    body += """</td>
              </tr>
            </table>
          </body>
        </html>"""

    return body


def _generate_footer_line(unsubscribe_url, settings_url):
    footer_line = '<p style="text-align:center; font-size:10px"><a href="'
    footer_line += unsubscribe_url
    footer_line += '">Unsubscribe</a>  |  <a href="'
    footer_line += settings_url
    footer_line += '">Update Settings</a></p>'
    return footer_line


def _generate_important_post_tile(user_id, post):
    shop = post.shop_key.get()
    shop_id = shop.key.urlsafe()

    url = 'lightho.us/shop_link/{}/{}'.format(user_id, shop_id)
    return """
      <tr>
        <td style="display: block;max-width: 500px;margin: 3px auto;">
          <div style="background-color: #F0F0F0;padding: 10px;">
            <a href='""" + url + "'style='text-decoration: none;'>" + shop.name + """</a>
            <div>""" + post.title + """</div>
          </div>
        </td>
      </tr>
      """


def _generate_unimportant_post_line(user_id, post):
    shop = post.shop_key.get()
    shop_id = shop.key.urlsafe()

    url = 'lightho.us/shop_link/{}/{}'.format(user_id, shop_id)

    return """
    <div>
      <a href='""" + url + """'style='text-decoration: none;'>
      """ + shop.name + """</a> - """ + post.title + """
    </div>"""


def send_verification_email(email, verification_url):
    body = """
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat" rel="stylesheet">
      </head>
      <body style="font-family: 'Roboto', sans-serif;">
        <table style="width: 100%;min-width: 400px;">
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #003091;text-align: center;padding: 15px;">
                <table style="width: 35%;margin: 0 auto;">
                  <tr>
                    <th>
                      <a href="lightho.us">
                      <img style="max-width: 300px;" src="https://lightho.us/blue_logo.png" alt="lightho.us logo"></a>
                    </th>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #f0f0f0;padding: 40px;font-size: 20px;">
                <p style="margin-top: 0;margin-bottom: 80px;color: #000000 !important;">Welcome to <a style="font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a>! To complete the sign up process, please confirm your email here:</p>
                <div style="text-align: center;margin: 40px 0px;">
                  <a href="
                    """
    body += verification_url
    body += """
                    " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 15px 30px;letter-spacing: 2px;">VERIFY EMAIL</a>
                </div>
                <p style="margin-bottom: 0;margin-top: 80px;color: #000000 !important;"><3,</p>
                <p style="margin-top: 0;margin-bottom: 0;color: #000000 !important;">The <a style="font-weight: normal;font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a> team</p>
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
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat" rel="stylesheet">
      </head>
      <body style="font-family: 'Roboto', sans-serif;">
        <table style="width: 100%; min-width: 400px;">
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #003091;text-align: center;padding: 15px;">
                <table style="width: 35%;margin: 0 auto;">
                  <tr>
                    <th>
                      <a href="lightho.us">
                      <img style="max-width: 300px;" src="https://lightho.us/blue_logo.png" alt="lightho.us logo"></a>
                    </th>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #f0f0f0;padding: 40px;font-size: 20px;">
                <p style="margin-top: 0;margin-bottom: 80px;">Hey there! Click the button below to change your password. If you think you got this email by mistake, just ignore it.</p>
                <div style="text-align: center;margin: 40px 0px;">
                  <a href= "
                  """
    body += forgot_password_url
    body += """
                  " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 15px 30px;letter-spacing: 2px;">CHANGE PASSWORD</a>
                </div>
                <p style="margin-bottom: 0;margin-top: 80px;"><3,</p>
                <p style="margin-top: 0;margin-bottom: 0;">The <a style="font-weight: normal;font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a> team</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>"""

    message = mail.EmailMessage(sender="no-reply@lightho.us", subject='lightho.us Password Recovery Email')
    message.to = email
    message.html = body
    message.send()
