import csv
import re

from src.backend.models.models import Shop


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
