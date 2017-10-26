import unittest
import webapp2
import json
import datetime
import time


from backend.backend import app
from backend.models import Post

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
        return request_verify.get_response(app)

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
        request_signup = webapp2.Request.blank('/rest/signup',
                                               POST=self._contents)
        request_signup.get_response(app)

        request_login = webapp2.Request.blank('/rest/login',
                                              POST=self._contents)
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
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        request_password_url = webapp2.Request.blank('/rest/reset_password',
                                                     POST=self._contents)
        response_password_url = request_password_url.get_response(app)

        request_password = webapp2.Request.blank(response_password_url.body,
                                            POST={'password': 'new_pass'})
        response_password = request_password.get_response(app)

        self.assertEqual(response_password.status_int, 200)
        self.assertIn('user dude has had', response_password.body)

        request_login = webapp2.Request.blank('/rest/login', POST=
            {'username': 'dude', 'password': 'new_pass'})
        response_login = request_login.get_response(app)

        self.assertEqual(response_login.status_int, 200)
        self.assertEqual('success', response_login.body)

    def test_password_reset_no_username(self):
        """user cannot reset the password of a nonexistent username"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        request_password_url = webapp2.Request.blank('/rest/reset_password',
                                                POST={'username': 'not_dude'})
        response_password_url = request_password_url.get_response(app)

        self.assertEqual(response_password_url.status_int, 200)
        self.assertIn('Could not find any user', response_password_url.body)

    def test_same_password_reset(self):
        """user can reset password with same password"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        request_password_url = webapp2.Request.blank('/rest/reset_password',
                                                     POST=self._contents)
        response_password_url = request_password_url.get_response(app)

        request_password = webapp2.Request.blank(response_password_url.body,
                                                 POST={'password': 'plaintext_sucks'})
        response_password = request_password.get_response(app)

        self.assertEqual(response_password.status_int, 200)
        self.assertIn('user dude has had', response_password.body)

        request_login = webapp2.Request.blank('/rest/login', POST=
        {'username': 'dude', 'password': 'plaintext_sucks'})
        response_login = request_login.get_response(app)

        self.assertEqual(response_login.status_int, 200)
        self.assertEqual('success', response_login.body)

    def test_logged_in_after_verify(self):
        """user is already logged in after verifying email"""
        utils.stub_rest(self)
        verify_response = self._signup_and_verify(self._contents)

        request_user_data = webapp2.Request.blank('/rest/login')
        request_user_data.method = 'GET'
        # hack to fib through the auth cookie
        request_user_data.headers['Cookie'] = verify_response.headers['Set-Cookie']
        response_user_data = request_user_data.get_response(app)

        self.assertEqual(200, response_user_data.status_int)
        self.assertEqual('dude', response_user_data.body)

    def test_must_be_logged_in(self):
        """user is redirected if not logged in (no auth cookie)"""
        request_session = webapp2.Request.blank('/rest/login')
        request_session.method = 'GET'
        response_session = request_session.get_response(app)

        self.assertEqual(302, response_session.status_int)

    def test_logged_in_after_reset(self):
        """user is already logged in after resetting password"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        request_logout = webapp2.Request.blank('/rest/logout')
        request_logout.method = 'GET'
        response_logout = request_logout.get_response(app)

        request_password_url = webapp2.Request.blank('/rest/reset_password',
                                                     POST=self._contents)
        response_password_url = request_password_url.get_response(app)

        request_password = webapp2.Request.blank(response_password_url.body,
                                                 POST={'password': 'new_pass'})
        response_password = request_password.get_response(app)

        request_user_data = webapp2.Request.blank('/rest/login')
        request_user_data.method = 'GET'
        # hack to fib through the auth cookie
        request_user_data.headers['Cookie'] = response_password.headers['Set-Cookie']
        response_user_data = request_user_data.get_response(app)

        self.assertEqual(200, response_user_data.status_int)
        self.assertEqual('dude', response_user_data.body)

    def test_password_reset_early_login(self):
        """user cannot ask to reset password and login before
        resetting password"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        request_password_url = webapp2.Request.blank('/rest/reset_password',
                                                     POST=self._contents)
        response_password_url = request_password_url.get_response(app)

        request_login = webapp2.Request.blank('/rest/login',
                                              POST=self._contents)
        response_login = request_login.get_response(app)

        self.assertEqual(200, response_login.status_int)
        self.assertIn('password reset', response_login.body)

    def test_multiple_signups(self):
        """user cannot sign up with an already used email or username"""
        utils.stub_rest(self)
        self._signup_and_verify(self._contents)

        # no duplicate emails
        contents_same_email = self._contents.copy()
        contents_same_email['username'] = 'not_dude'
        same_email_request = webapp2.Request.blank('/rest/signup',
                                                   POST=contents_same_email)
        same_email_response = same_email_request.get_response(app)

        self.assertEqual(same_email_response.status_int, 200)
        self.assertIn('Unable to create user', same_email_response.body)
        self.assertIn('not_dude', same_email_response.body)

        # no duplicate usernames
        contents_same_username = self._contents.copy()
        contents_same_username['email'] = 'not_test'
        same_uname_request = webapp2.Request.blank('/rest/signup',
                                                   POST=contents_same_username)
        same_uname_response = same_uname_request.get_response(app)

        self.assertEqual(same_uname_response.status_int, 200)
        self.assertIn('Unable to create user', same_uname_response.body)
        self.assertIn('dude', same_uname_response.body)

        # check signup still works
        unique_enough_contents = self._contents.copy()
        unique_enough_contents['email'] = 'not_test'
        unique_enough_contents['username'] = 'not_dude'
        unique_request = webapp2.Request.blank('/rest/signup', POST=unique_enough_contents)
        unique_response = unique_request.get_response(app)

        self.assertEqual(unique_response.status_int, 200)
        self.assertIn('/rest/v', unique_response.body)