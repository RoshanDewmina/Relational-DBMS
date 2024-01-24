import csv
import random

# Function to generate a random date in the format 'YYYY-MM-DD'
def random_date():
    year = random.randint(2015, 2023)
    month = random.randint(1, 12)
    day = random.randint(1, 28)  # Assuming maximum 28 days in a month
    return f"{year}-{month:02d}-{day:02d}"

# Create and open the CSV file
with open('employees_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)

    # Header row
    writer.writerow(["EID", "Name", "Age", "Gender", "Position", "Department", "Salary", "Email", "Phone", "Address",
                     "StartDate", "Ethnicity", "MaritalStatus", "Education", "Experience"])

    # Generate data for 100 more employees
    for i in range(1, 7):
        eid = f"E{i}"
        name = f"Employee {i}"
        age = random.randint(22, 65)
        gender = random.choice(["Male", "Female"])
        position = random.choice(["Software Engineer", "Data Analyst", "Product Manager", "UI/UX Designer", "Data Scientist"])
        department = random.choice(["Engineering", "Analytics", "Product Management", "Design", "Finance"])
        salary = random.randint(50000, 100000)
        email = f"employee{i}@example.com"
        phone = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        address = f"{random.randint(1, 999)} {random.choice(['Main', 'Elm', 'Oak', 'Pine', 'Cedar'])} St"
        start_date = random_date()
        ethnicity = random.choice(["Asian", "Caucasian", "Hispanic", "African American"])
        marital_status = random.choice(["Married", "Single", "Divorced"])
        education = random.choice(["Bachelor's", "Master's", "Ph.D."])
        experience = random.randint(0, 15)

        # Write data to CSV
        writer.writerow([eid, name, age, gender, position, department, salary, email, phone, address,
                         start_date, ethnicity, marital_status, education, experience])
