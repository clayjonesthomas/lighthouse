import unittest
import webapp2
import json

from backend.backend import Posts, app
import utils


class TestMain(unittest.TestCase):

    def test_get(self):
        request = webapp2.Request.blank('/')
        request.method = 'GET'
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertIsNotNone(response.body)


class TestPosts(unittest.TestCase):

    def test_get_default(self):
        utils.stub_rest(self)
        request = webapp2.Request.blank('/rest/posts')
        request.method = 'GET'
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertEqual(len(json.loads(response.body)), 10)
        self.assertIn({'title': 'test post please ignore 0'}, json.loads(response.body))

    def test_post(self):
        utils.stub_rest(self)
        contents = {'title': "John's store clearance sale"}
        request = webapp2.Request.blank('/rest/posts', POST=contents)
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertIsNotNone(response.body)

    def test_get_and_post(self):
        utils.stub_rest(self)
        contents = {'title': "John's store clearance sale"}
        request_post = webapp2.Request.blank('/rest/posts', POST=contents)
        response_post = request_post.get_response(app)
        self.assertEqual(response_post.status_int, 200)

        request_get = webapp2.Request.blank('/rest/posts')
        request_get.method = 'GET'
        response_get = request_get.get_response(app)

        self.assertEqual(response_get.status_int, 200)
        self.assertEqual(len(json.loads(response_get.body)), 1)
        self.assertIn({'title': "John's store clearance sale"}, json.loads(response_get.body))