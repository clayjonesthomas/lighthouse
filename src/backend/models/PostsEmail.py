from google.appengine.api import mail
from google.appengine.ext import ndb
from models import Post
from backend.enums import EmailFrequency


class PostsEmail(ndb.Model):

    body = ndb.StringProperty(indexed=False)
    to = ndb.KeyProperty(indexed=True, kind='User')
    subject = ndb.StringProperty(indexed=False)
    important_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    unimportant_posts = ndb.KeyProperty(indexed=True, kind='Post', repeated=True)
    timestamp = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
    unsubscribe_url = ndb.StringProperty(indexed=False)
    settings_url = ndb.StringProperty(indexed=False)
    feed_page_url = ndb.StringProperty(indexed=False)

    def compose_email_for_user(self, jinja_env):
        """
        Requires but does not check that to, important_posts,
        unimportant_posts, unsubscribe_url, and settings_url are set
        """
        self._generate_body(jinja_env)
        self._generate_subject()

    def _generate_subject(self):
        subject = u"[lightho.\u200bus] "
        if self.important_posts:
            subject += self.important_posts[0].get().shop_key.get().name
            subject += ": "
            subject += self.important_posts[0].get().title
        else:
            subject += self.unimportant_posts[0].get().shop_key.get().name
            subject += ": "
            subject += self.unimportant_posts[0].get().title

        self.subject = subject

    def _generate_body(self, jinja_env):
        template = jinja_env.get_template('templates/update_email.html')
        posts = self.important_posts
        if self.to.get().email_frequency == EmailFrequency.HIGH_FREQUENCY_EMAIL:
            posts.extend(self.unimportant_posts)
        rendered_template = template.render(
            to_id=self.to.urlsafe(),
            posts=posts,
            unsubscribe_url=self.unsubscribe_url,
            settings_url=self.settings_url,
            feed_page_url=self.feed_page_url
        )
        self.body = rendered_template

    def send(self):
        receiving_user = self.to.get()
        message = mail.EmailMessage(
            sender="beacon@lightho.us",
            subject=self.subject,
            to=receiving_user.email_address,
            html=self.body,
            headers={
                "List-Unsubscribe": "<" + self.unsubscribe_url + ">"
            }
        )
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
