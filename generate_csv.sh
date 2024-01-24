#!/bin/bash

# Navigate to the generate-test-data directory
cd generate-test-data

# Check if the csv directory exists, create it if it doesn't
if [ ! -d "../csv" ]; then
    echo "Creating csv directory..."
    mkdir ../csv
else
    # Clear existing CSV files in the csv directory
    echo "Removing old CSV files..."
    rm -rf ../csv/*
fi

# Run each Python script to generate new CSV files
echo "Generating new CSV files..."
python3 gen-em.py
python3 gen-products.py
python3 gen-sales.py
python3 generate_employees_data.py

# Move the generated CSV files to the csv directory
mv *.csv ../csv/
echo "CSV files generated and moved to the csv directory."
