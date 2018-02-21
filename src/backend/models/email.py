from google.appengine.api import mail
from google.appengine.ext import ndb
from src.backend.models.models import Post

SUBJECT_shop_LIMIT = 3  # TODO: decide on the number for this


class PostsEmail(ndb.Model):

    body = ndb.StringProperty(indexed=False)
    to = ndb.KeyProperty(indexed=True, kind='User')
    subject = ndb.StringProperty(indexed=False)
    important_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    unimportant_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    unsubscribe_url = ndb.StringProperty(indexed=False)
    settings_url = ndb.StringProperty(indexed=False)

    def compose_email_for_user(self):
        """
        Requires but does not check that to, important_posts,
        unimportant_posts, unsubscribe_url, and settings_url are set
        """
        self._generate_body()
        self._generate_subject()

    def _generate_subject(self):
        subject = "lightho.us \\\\"
        for i_post in self.important_posts[:SUBJECT_shop_LIMIT]:
            subject += " " + i_post.shop_key.get().name + ","

        shop_count = len(self.important_posts)
        if shop_count < SUBJECT_shop_LIMIT:
            for u_post in self.unimportant_posts:
                if shop_count >= SUBJECT_shop_LIMIT:
                    subject += " +"
                    break
                subject += " " + u_post.shop_key.get().name + ","
                shop_count += 1

        if subject[-1] == ",":
            subject = subject[:-1]

        return subject

    def _generate_body(self):
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

        for i_post in self.important_posts:
            body += self._generate_important_post_tile(i_post)
            body += "\n"

        if self.unimportant_posts:
            body += """      
              <tr>
                <td style="display: block;max-width: 500px;margin: 3px auto;">
                  <div style="background-color: #F0F0F0;padding: 10px;">"""
            if self.important_posts:
                body += """<div style="text-align: center;font-size: 18px;">Other Sales</div>"""

            for u_post in self.unimportant_posts:
                body += self._generate_unimportant_post_line(u_post)
                body += "\n"

            body += "</div>"

        body += self._generate_footer_line()

        body += """</td>
                  </tr>
                </table>
              </body>
            </html>"""

        return body

    def _generate_footer_line(self):
        footer_line = '<p style="text-align:center; font-size:10px"><a href="'
        footer_line += self.unsubscribe_url
        footer_line += '">Unsubscribe</a>  |  <a href="'
        footer_line += self.settings_url
        footer_line += '">Update Settings</a></p>'
        return footer_line

    def _generate_important_post_tile(self, post):
        shop = post.shop_key.get()
        shop_id = shop.key.urlsafe()

        url = 'lightho.us/shop_link/{}/{}'.format(self.to.urlsafe(), shop_id)
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

    def _generate_unimportant_post_line(self, post):
        shop = post.shop_key.get()
        shop_id = shop.key.urlsafe()

        url = 'lightho.us/shop_link/{}/{}'.format(self.to.urlsafe(), shop_id)

        return """
        <div>
          <a href='""" + url + """'style='text-decoration: none;'>
          """ + shop.name + """</a> - """ + post.title + """
        </div>"""

    def send(self):
        receiving_user = self.to.get()
        message = mail.EmailMessage(sender="beacon@lightho.us",
                                    subject=self.subject)
        message.to = receiving_user.email_address
        message.html = self.body
        message.send()
        self.put()
        receiving_user.emails.append(self.key)
        receiving_user.put()


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
