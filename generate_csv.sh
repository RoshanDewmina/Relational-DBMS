#!/bin/bash

# To use this script:

# Save it as generate_csv.sh in your main folder.
# Give it execute permissions: Run chmod +x generate_csv.sh in your terminal.
# Execute the script: Run ./generate_csv.sh.


# Navigate to the generate-test-data directory
cd generate-test-data

# Clear existing CSV files in the csv directory
rm -rf ../csv/*
echo "Old CSV files removed."

# Run each Python script to generate new CSV files
echo "Generating new CSV files..."
python3 gen-em.py
python3 gen-products.py
python3 gen-sales.py
python3 generate_employees_data.py

# Move the generated CSV files to the csv directory
mv *.csv ../csv/
echo "CSV files generated and moved to the csv directory."
