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
        shop = Shop(
            name=store.name,
            alternate_names=store.alternate_names,
            website=store.website,
            likes=store.likes,
            timestamp=store.timestamp,
            icon_url=store.icon_url
        )

        shop.put()
        count += 1

    logging.info("{} shops created".format(count))

