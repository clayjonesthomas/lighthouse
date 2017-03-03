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


class TestAuth(unittest.TestCase):
    # it is rather difficult to adequately test these classes individually,
    # so integration tests that build up are good enough for now

    _contents = {'username': 'dude', 'email': 'test@test.com',
                 'password': 'plaintext_sucks'}

    def _signup_and_verify(self, user_dict):
        """helper that signs up and verifies a user"""
        request_signup = webapp2.Request.blank('/rest/signup', POST=user_dict)
        response_signup = request_signup.get_response(app)

        request_verify = webapp2.Request.blank(response_signup.body)
        request_verify.method = 'GET'
        request_verify.get_response(app)

    def test_signup_handler(self):
        """user can sign up"""

        utils.stub_rest(self)
        request = webapp2.Request.blank('/rest/signup', POST=self._contents)
        response = request.get_response(app)

        self.assertEqual(response.status_int, 200)
        self.assertIn('/rest/v/', response.body)

    def test_verification_handler(self):
        """user can sign up and verify email"""

        utils.stub_rest(self)
        request_signup = webapp2.Request.blank('/rest/signup', POST=self._contents)
        response_signup = request_signup.get_response(app)

        request_verify = webapp2.Request.blank(response_signup.body)
        request_verify.method = 'GET'
        response_verify = request_verify.get_response(app)

        self.assertEqual(response_verify.status_int, 200)
        self.assertIn('user dude', response_verify.body)

    def test_login_handler(self):
        """user can login after signup and verification"""

        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        # this should be a case where the user is already logged in because of verify
        request_login = webapp2.Request.blank('/rest/login', POST=self._contents)
        response_login = request_login.get_response(app)

        self.assertEqual(response_login.status_int, 200)
        self.assertEqual(response_login.body, 'success')

    def test_login_no_verify(self):
        """user cannot login without verification"""

        utils.stub_rest(self)
        request_signup = webapp2.Request.blank('/rest/signup', POST=self._contents)
        request_signup.get_response(app)

        request_login = webapp2.Request.blank('/rest/login', POST=self._contents)
        response_login = request_login.get_response(app)

        self.assertEqual(response_login.status_int, 200)
        self.assertIn('unverified', response_login.body)

    def test_logout(self):
        """user can log in and log out"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)
        request_logout = webapp2.Request.blank('/rest/logout')
        request_logout.method = 'GET'
        response_logout = request_logout.get_response(app)

        self.assertEqual(response_logout.status_int, 200)
        self.assertEqual('Logout successful', response_logout.body)


    def test_password_reset(self):
        """user can reset password and log in with new one"""

    def test_same_password_reset(self):
        """user can reset password"""

    def test_logged_in_after_verify(self):
        """user is already logged in after verifying email"""

    def test_logged_in_after_reset(self):
        """user is already logged in after resetting password"""

    def test_password_reset_early_login(self):
        """user cannot ask to reset password and login before
        resetting password"""

    def test_multiple_signups(self):
        """user cannot sign up with an already used email or username"""






















