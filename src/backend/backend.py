import jinja2
import json
import logging
from google.appengine.ext import ndb
import os
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def spawn_dummy_posts():
    for i in range(10):
        Post(title=format('test post please ignore {}'.format(i))).put()


def main():
    logging.info('in main')
    if len(Post.query().fetch(10)) <= 0:
        logging.info("spawning dummy datastore entries")
        spawn_dummy_posts()

if __name__ == "__main__":
    main()


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)

    # using _values for the time being but unsure of its spec
    # def post_json_parser(self):
    #     result = []
    #     import pdb; pdb.set_trace()
    #     result.append(dict([(p, unicode(getattr(self, p))) for p in self._values]))
    #     return result

class MainPage(webapp2.RequestHandler):

    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class Posts(webapp2.RequestHandler):

    def post(self):
        title = self.request.get('title', None)
        post = Post(title=title)
        post_key = post.put()

    def get(self):
        if len(Post.query().fetch(10)) <= 0:
            logging.info("spawning dummy datastore entries")
            spawn_dummy_posts()
        fetched_posts = [post.to_dict() for post in Post.query().fetch(10)]
        logging.info("pulling posts from the datastore")
        self.response.write(json.dumps(fetched_posts))


app = webapp2.WSGIApplication([
    ('/rest/posts', Posts),
    ('/.*', MainPage),
], debug=True)

