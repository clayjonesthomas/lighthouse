from google.appengine.ext import ndb
from models import Post, Shop, Shop, User, get_entity_from_url_key
import logging

import enums.EmailFrequency as EmailFrequency

import csv


def migration_script():
    count = 0
    for store in Shop.query():
        if store.likes > 0:
            count += 1
            store.likes = 0
            store.put()
    logging.info("Stores with likes wiped: {}".format(count))
