# Relational-DBMS

## Overview

**Relational-DBMS** is an  relational algebra query processor designed for efficient database querying and manipulation. This tool parses and executes your relational algebra queries.

## Features

- **Intuitive Query Processing**: Outputs query results in a clear, readable format.
- **Efficient Execution Flow**: Traverses the query tree to perform database operations in a logical sequence.
- **Result Visualization**: Clearly displays query results, enhancing data analysis and interpretation.

## Supported Commands

**Relational-DBMS** supports a comprehensive range of relational algebra operations, catering to various data manipulation and querying needs. The supported commands include:

- `select`: Filters rows based on specified conditions.
- `project`: Retrieves specific columns from a table.
- `cartesianProduct`: Combines two sets to produce all possible combinations.
- `innerJoin`: Merges two tables based on a matching condition.
- `leftOuterJoin`: Performs a left join, including all records from the left table.
- `rightOuterJoin`: Executes a right join, keeping all records from the right table.
- `intersection`: Finds common elements between two sets.
- `union`: Combines two sets and removes duplicates.
- `minus`: Subtracts one set from another.
- `divide`: Divides one set by another based on a common attribute.
- `count`: Counts the number of occurrences of a specified attribute.
- `groupBy`: Groups data based on one or more attributes.
- `having`: Applies a condition to grouped records.
- `rename`: Renames attributes in a dataset for clarity or convenience.

## Example Queries for Relational Database Management System

### Select Operation

- Query: `select row.Age > 30(employees_data.csv)`
- Description: Selects records from `employees_data.csv` where the age is greater than 30.

### Project Operation

- Query: `project Name, Age(employees_data.csv)`
- Description: Projects the `Name` and `Age` columns from `employees_data.csv`.

### Cartesian Product Operation

- Query: `cartesianProduct employees.csv products.csv`
- Description: Performs a cartesian product between `employees.csv` and `products.csv`.

### Inner Join Operation

- Query: `innerJoin employees.csv sales.csv on row1.EmployeeID == row2.EmployeeID`
- Description: Performs an inner join between `employees.csv` and `sales.csv` on `EmployeeID`.

### Left Outer Join Operation

- Query: `leftOuterJoin employees.csv sales.csv on row1.EmployeeID == row2.EmployeeID`
- Description: Performs a left outer join between `employees.csv` and `sales.csv` on `EmployeeID`.

### Right Outer Join Operation

- Query: `rightOuterJoin employees.csv sales.csv on row1.EmployeeID == row2.EmployeeID`
- Description: Performs a right outer join between `employees.csv` and `sales.csv` on `EmployeeID`.

### Intersection Operation

- Query: `intersection employees.csv employees_data.csv`
- Description: Finds the intersection of records between `employees.csv` and `employees_data.csv`.

### Union Operation

- Query: `union employees.csv employees_data.csv`
- Description: Combines records from `employees.csv` and `employees_data.csv`.

### Minus Operation

- Query: `minus employees.csv employees_data.csv`
- Description: Finds records in `employees.csv` that are not in `employees_data.csv`.

### Divide Operation

- Query: `divide sales.csv products.csv, ProductID`
- Description: Performs a division operation between `sales.csv` and `products.csv` based on `ProductID`.

### Count Operation

- Query: `count Age(employees_data.csv)`
- Description: Counts the number of records with a non-null `Age` in `employees_data.csv`.

### GroupBy Operation

- Query: `groupBy Department(employees_data.csv)`
- Description: Groups records in `employees_data.csv` by `Department`.

### Having Operation

- Query: `having row.Count > 5(groupBy Department(employees_data.csv))`
- Description: Filters groups from `employees_data.csv` having more than 5 employees in a department.

### Rename Operation

- Query: `rename Age as EmployeeAge(employees_data.csv)`
- Description: Renames the `Age` column to `EmployeeAge` in `employees_data.csv`.

## Getting Started

### Initial Setup

1. **Clone the Repository**: Get the project onto your local machine.
2. **Prerequisites**: Ensure Node.js and Python is installed.

### Installation and Execution

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Install Python Dependencies**:

   ```bash
   pip install faker
   ```

   or

   ```bash
   pip3 install faker
   ```

3. **Give Permissions**:

   ```bash
   chmod +x generate_csv.sh
   ```

4. **Generate CSV Files**:

   ```bash
   ./generate_csv.sh
   ```

   This script prepares test CSV files for querying.

5. **Launch the Processor**:

   ```bash
   npm run db-init
   ```

   Initiates the query processor.

### Usage Instructions

1. **CSV File Paths**: When prompted, enter the paths to your CSV files, separated by commas.
2. **Enter Your Query**: Type in your relational algebra query following the prompt.
3. **Results**: Hit enter to execute and view the results of your query.
