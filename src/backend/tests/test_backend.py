import unittest
import webapp2
import json

from backend.backend import Posts, app

from google.appengine.ext import testbed


class TestMain(unittest.TestCase):

    def test_get(self):
        request = webapp2.Request.blank('/')
        request.method = 'GET'
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertIsNotNone(response.body)


class TestPosts(unittest.TestCase):

    def test_post(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        request = webapp2.Request.blank('/rest/posts')
        request.method = 'GET'
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertEqual(len(json.loads(response.body)), 10)
        self.assertIn({'title': 'test post please ignore 0'}, json.loads(response.body))
        # import ipdb; ipdb.set_trace()

