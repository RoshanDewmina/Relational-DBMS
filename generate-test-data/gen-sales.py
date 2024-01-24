import csv
import random
from faker import Faker

fake = Faker()

def generate_sales_data(filename, num_rows):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["SaleID", "ProductID", "Date", "Quantity", "TotalPrice"])

        for _ in range(num_rows):
            sale_id = fake.unique.random_number(digits=5)
            product_id = fake.random_number(digits=5)
            date = fake.date()
            quantity = random.randint(1, 20)
            total_price = round(random.uniform(20, 1000), 2)

            writer.writerow([sale_id, product_id, date, quantity, total_price])

# Generate 100 rows of sales data
generate_sales_data('sales.csv', 10000)
