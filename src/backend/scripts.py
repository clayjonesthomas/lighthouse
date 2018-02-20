import csv
import re
from models import Shop, User


def update_stores():
    count = 0
    with open("stores.csv") as f:
        csv_file = csv.reader(f)
        for row in csv_file:
            if len(Shop.query(Shop.name.lower() == row[0].lower()).fetch(1)):
                continue
            alternate_names = re.split(",\s*", row[1])
            shop = Shop(
                name=row[0],
                alternate_names=alternate_names,
                website=row[2]
            )
            shop.put()
            count += 1
    return count

def make_emails_lower():
	for user in User.query():
		user.email_address = user.email_address.lower()
		user.put()

def make_auth_ids_lower():
	for user in User.query():
		lowered_auth_ids = []
		for auth_id in user.auth_ids:
			lowered_auth_ids.append(auth_id.lower())
		user.auth_ids = lowered_auth_ids
		user.put()

