import unittest

from backend.models import User

from google.appengine.ext import testbed


class TestUser(unittest.TestCase):

    def test_set_password(self):
        u = User()
        self.assertIsNone(u.password)
        u.set_password('password')
        self.assertNotEqual(u.password, 'password')
        self.assertIsNotNone(u.password)

        # hard to do right without stubbing webapp2 so will depend on
        # backend tests for this
        # def test_get_by_auth_token(self):
        #     self.testbed = testbed.Testbed()
        #     self.testbed.activate()
        #     self.testbed.init_datastore_v3_stub()
        #     self.testbed.init_memcache_stub()
        #     import ipdb; ipdb.set_trace()
        #     u = User()
        #     u.username = 'user_name'
        #     u.put()
        #     u_id = u.get_id()
        #     token = User.create_signup_token(u_id)
        #     gotten_user = User.get_by_auth_token(u_id, token)[1]
        #
        #     self.assertEqual('user_name', gotten_user.username)
