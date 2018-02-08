from google.appengine.ext import ndb
from models import Post, Shop, Shop, User, get_entity_from_url_key
import logging

import enums.EmailFrequency as EmailFrequency

import csv


def migration_script():
    count = 0
    for store in Shop.query():
        if len(Shop.query(Shop.name == store.name).fetch(2)) == 2:
            count += 1
            store.key.delete()
    logging.info("Stores removed: {}".format(count))
