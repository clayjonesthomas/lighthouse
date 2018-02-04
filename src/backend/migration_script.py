from google.appengine.ext import ndb
from models import Post, Shop, Shop, User, get_entity_from_url_key
import logging


def migration_script():
    # post
    # is_archived
    # is_important

    # store to shop

    # user
    # email_address
    # using_email_service
    # liked_stores to liked_shops
    # email_frequency
    # emails
    # make email auth id
    count = 0
    for post in Post.query():
        name = post.shop_key.get().name
        post.temp_shop_key = Shop.query(Shop.name == name).fetch(1)[0].key
        post.put()
        count += 1

    logging.info("{} posts updated".format(count))

    count = 0
    for user in User.query():
        user.liked_shops = []
        for liked_store_key in user.liked_stores:
            liked_store = liked_store_key.get()
            name = liked_store.name
            liked_shop = Shop.query(Shop.name == name).fetch(1)[0]
            user.liked_shops.append(liked_shop.key)
        user.put()
        count += 1

    logging.info("{} users updated".format(count))
