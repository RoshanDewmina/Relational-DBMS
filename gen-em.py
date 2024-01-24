import csv
import random
from faker import Faker

fake = Faker()

def generate_employee_data(filename, num_rows):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["EID", "Name", "Age", "Gender", "Department", "Salary"])

        for _ in range(num_rows):
            eid = fake.unique.random_number(digits=5)
            name = fake.name()
            age = random.randint(22, 65)
            gender = random.choice(["Male", "Female", "Other"])
            department = random.choice(["HR", "Finance", "IT", "Sales", "Marketing"])
            salary = random.randint(30000, 120000)

            writer.writerow([eid, name, age, gender, department, salary])

# Generate 100 rows of employee data
generate_employee_data('employees.csv', 100)
