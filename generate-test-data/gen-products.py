import csv
import random
from faker import Faker

fake = Faker()

def generate_product_data(filename, num_rows):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["ProductID", "ProductName", "Category", "Price", "Quantity"])

        for _ in range(num_rows):
            product_id = fake.unique.random_number(digits=5)
            product_name = fake.word().capitalize()
            category = random.choice(["Electronics", "Clothing", "Home", "Toys", "Books"])
            price = round(random.uniform(10, 500), 2)
            quantity = random.randint(0, 100)

            writer.writerow([product_id, product_name, category, price, quantity])

# Generate 100 rows of product data
generate_product_data('products.csv', 10000)
