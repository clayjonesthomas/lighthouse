import csv
from models import Shop


def update_stores():
    count = 0
    with open("stores.csv") as f:
        csv_file = csv.reader(f)
        for row in csv_file:
            if len(Shop.query(Shop.name == row[1]).fetch(1)):
                pass
            alternate_names = csv.reader(row[1])
            import pdb; pdb.set_trace()
            shop = Shop(
                name=row[0],
                alternate_names=alternate_names,
                website=row[2]
            )
            shop.put()
            count += 1
    return count
