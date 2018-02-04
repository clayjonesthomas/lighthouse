from google.appengine.ext import ndb
from models import Post, Store, User, get_entity_from_url_key
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
    for post in Post.query():
        post.is_archived = post.isArchived
        post.is_important = False
        post.put()
        count += 1

    logging.info("{} posts updated".format(count))

