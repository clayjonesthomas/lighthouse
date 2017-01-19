import os

from google.appengine.ext import ndb

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class Post(ndb.Model):
    title = ndb.StringProperty(indexed=True)
    

class MainPage(webapp2.RequestHandler):

    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class Posts(webapp2.RequestHandler):

    def post(self):
        title = self.request.get('title', None)
        post = Post(title=title)
        post_key = post.put()
        import pdb; pdb.set_trace()


app = webapp2.WSGIApplication([
    ('/rest/posts', Posts),
    ('/.*', MainPage),
], debug=True)
