# Relational-DBMS:

## Overview

**Relational-DBMS** is an  relational algebra query processor designed for efficient database querying and manipulation. This tool parses and executes your relational algebra queries.



## Key Features

- **Intuitive Query Processing**: Outputs query results in a clear, readable format.

- **Efficient Execution Flow**: Traverses the query tree to perform database operations in a logical sequence.
- **Database Integration**: Seamlessly interacts with database tables to fetch and modify data.
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


## Getting Started

### Initial Setup

1. **Clone the Repository**: Get the project onto your local machine.
2. **Prerequisites**: Ensure Node.js and Python is installed.

### Installation and Execution

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Generate CSV Files**:
   ```bash
   ./generate_csv.sh
   ```
   This script prepares test CSV files for querying.

3. **Launch the Processor**:
   ```bash
   npm run db-init
   ```
   Initiates the query processor.

### Usage Instructions

1. **CSV File Paths**: When prompted, enter the paths to your CSV files, separated by commas.
2. **Enter Your Query**: Type in your relational algebra query following the prompt.
3. **Results**: Hit enter to execute and view the results of your query.

##  Tips

- Familiarize yourself with basic relational algebra concepts to maximize the utility of this tool.
- Carefully format your queries according to relational algebra syntax for accurate results.
- Ensure that your CSV files are formatted correctly to avoid errors.
