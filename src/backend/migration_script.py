from google.appengine.ext import ndb
from models import Post, Shop, Shop, User, get_entity_from_url_key
import logging

import enums.EmailFrequency as EmailFrequency


def migration_script():

    # user
    # email_address
    # email_frequency
    # emails
    # make email auth id

    count = 0
    for user in User.query():
        user.email_frequency = EmailFrequency.UNSUBSCRIBE_EMAIL
        user.add_auth_id(user.email_address)
        user.put()

    logging.info("{} users updated".format(count))
