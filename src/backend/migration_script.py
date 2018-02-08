from google.appengine.ext import ndb
from models import Post, Shop, Shop, User, get_entity_from_url_key
import logging

import enums.EmailFrequency as EmailFrequency

import csv


def migration_script():
    count = 0
    with open("stores.csv", "rb") as f:
        reader = csv.reader(f)
        reader.next()
        reader.next()
        reader.next()
        reader.next()
        for row in reader:
            if Shop.query(Shop.name == row[0]).fetch(1):
                continue
            shop = Shop(name=row[0],
                        alternate_names=row[1].split(", "),
                        website=row[2]
                        )
            shop.put()
            count += 1
    logging.info("Stores added: {}".format(count))
