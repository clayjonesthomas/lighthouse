from google.appengine.ext import ndb
from models import Post, Store, Shop, User, get_entity_from_url_key
import logging


def migration_script():
    # post
    # is_archived
    # is_important

    # store to shop

    # user
    # email_address
    # using_email_service
    # email_frequency
    # emails
    # make email auth id
    count = 0
    for store in Store.query():
        store.alternate_names = []
        store.put()
        count += 1

    logging.info("{} shops updated updated".format(count))

