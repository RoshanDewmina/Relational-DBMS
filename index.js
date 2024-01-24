// Required modules for file system operations and command-line interface

const fs = require("fs");
const readline = require("readline");
const parseQuery = require("./parseQuery");
const {
  select,
  project,
  cartesianProduct,
  innerJoin,
  leftOuterJoin,
  rightOuterJoin,
  intersection,
  union,
  minus,
  divide,
  count,
  groupBy,
  having,
  rename,
} = require("./operations");

// Setting up readline interface for user interaction via command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to parse a CSV string into an array of objects
function parseCSV(csvString) {
  // Splitting the CSV string into lines
  const lines = csvString.split(/\r?\n/);
  // Extracting headers from the first line
  const headers = lines[0].split(",").map((header) => header.trim());
  // Processing each line to create data objects
  const data = lines.slice(1).map((line) => {
    // Matching CSV values, handling values enclosed in quotes
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!values) return {};

    let row = {};
    headers.forEach((header, index) => {
      // Assigning values to corresponding headers in the row
      row[header] = values[index].replace(/(^"|"$)/g, "").trim();
    });
    return row;
  });
  return data;
}

// Asynchronous function to read a CSV file and return parsed data
function readCSVFile(filePath) {
  // Returning a promise to handle asynchronous file reading
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err); // Rejecting the promise if an error occurs
      else resolve(parseCSV(data)); // Resolving with parsed CSV data
    });
  });
}

// Asynchronous function to read and parse multiple CSV files
async function readAllCSVFiles(filePaths) {
  let data = {};
  for (const path of filePaths) {
    // Extracting filename from each path
    const fileName = path.split("/").pop();
    // Reading and parsing each CSV file, storing data by filename
    data[fileName] = await readCSVFile(path);
  }
  return data; // Returning the compiled data object
}

function executeQuery(allData, parsedQuery) {
  // console.log("Available tables in allData:", Object.keys(allData));
  let data, data2;

  switch (parsedQuery.operation) {
    case "select":
      data = allData[parsedQuery.tableName];
      if (!data) {
        throw new Error(`Data for table '${parsedQuery.tableName}' not found`);
      }
      return select(data, parsedQuery.condition);

    case "project":
      data = allData[parsedQuery.tableName];
      if (!data) {
        throw new Error(`Data for table '${parsedQuery.tableName}' not found`);
      }
      return project(data, parsedQuery.params);

    case "cartesianProduct":
      data = allData[parsedQuery.tables[0]];
      data2 = allData[parsedQuery.tables[1]];
      if (!data || !data2) {
        throw new Error(
          `Data for tables '${parsedQuery.tables[0]}' or '${parsedQuery.tables[1]}' not found`
        );
      }
      return cartesianProduct(data, data2);

    case "innerJoin":
      data = allData[parsedQuery.params.table1];
      data2 = allData[parsedQuery.params.table2];
      const innerJoinCondition = new Function(
        "row1",
        "row2",
        `return ${parsedQuery.params.joinCondition}`
      );
      return innerJoin(data, data2, innerJoinCondition);

    case "leftOuterJoin":
      data = allData[parsedQuery.params.table1];
      data2 = allData[parsedQuery.params.table2];
      if (!data || !data2) {
        throw new Error(
          `Data for tables '${parsedQuery.params.table1}' or '${parsedQuery.params.table2}' not found`
        );
      }
      const leftJoinCondition = new Function(
        "row1",
        "row2",
        `return ${parsedQuery.params.joinCondition}`
      );
      return leftOuterJoin(
        data,
        data2,
        leftJoinCondition,
        Object.keys(data2[0])
      );

    case "rightOuterJoin":
      data = allData[parsedQuery.params.table1];
      data2 = allData[parsedQuery.params.table2];
      if (!data || !data2) {
        throw new Error(
          `Data for tables '${parsedQuery.params.table1}' or '${parsedQuery.params.table2}' not found`
        );
      }
      const rightJoinCondition = new Function(
        "row1",
        "row2",
        `return ${parsedQuery.params.joinCondition}`
      );
      return rightOuterJoin(
        data,
        data2,
        rightJoinCondition,
        Object.keys(data[0])
      );

    case "intersection":
      data = allData[parsedQuery.tables[0]];
      data2 = allData[parsedQuery.tables[1]];
      const intersectionCompare = new Function(
        "a",
        "b",
        `return ${parsedQuery.compareFunction}`
      );
      return intersection(data, data2, intersectionCompare);

    case "union":
      data = allData[parsedQuery.tables[0]];
      data2 = allData[parsedQuery.tables[1]];
      const unionCompare = new Function(
        "a",
        "b",
        `return ${parsedQuery.compareFunction}`
      );
      return union(data, data2, unionCompare);

    case "minus":
      data = allData[parsedQuery.tables[0]];
      data2 = allData[parsedQuery.tables[1]];
      const minusCompare = new Function(
        "a",
        "b",
        `return ${parsedQuery.compareFunction}`
      );
      return minus(data, data2, minusCompare);

    case "divide":
      data = allData[parsedQuery.table1];
      data2 = allData[parsedQuery.table2];
      if (!data || !data2) {
        throw new Error(
          `Data for tables '${parsedQuery.table1}' or '${parsedQuery.table2}' not found`
        );
      }
      return divide(data, data2, parsedQuery.commonAttribute);

    // Handling single-relation operations
    case "count":
      return count(data, parsedQuery.params);
    case "groupBy":
      return groupBy(data, parsedQuery.params);
    case "having":
      const havingCondition = new Function(
        "group",
        `return ${parsedQuery.params}`
      );
      return having(data, havingCondition);
    case "rename":
      return rename(data, parsedQuery.params);

    default:
      throw new Error(`Unsupported operation: ${parsedQuery.operation}`);
  }
}

// Function to prompt the user for a query and process it
function promptQuery(allData) {
  rl.question("Enter your query (or type 'exit' to quit):\n", (query) => {
    // Checking if the user wants to exit
    if (query.toLowerCase() === "exit") {
      console.log("Exiting program.");
      rl.close(); // Closing the readline interface
      return;
    }

    // Try-catch block to handle errors during query execution
    try {
      let parsedQuery = parseQuery(query); // Parsing the user's query
      let queryResult = executeQuery(allData, parsedQuery); // Executing the query
      console.log("Query Result:", queryResult); // Logging the result
    } catch (error) {
      console.error("Error executing query:", error); // Logging errors
    }

    // Recursively prompting for another query
    promptQuery(allData);
  });
}

// Initial prompt for the user to enter paths to CSV files
rl.question(
  "Enter paths to your CSV files separated by a comma:\n",
  (input) => {
    // Splitting the input into individual file paths
    const filePaths = input.split(",").map((path) => path.trim());
    // Reading and parsing CSV files, then starting query prompt
    readAllCSVFiles(filePaths)
      .then((allData) => {
        promptQuery(allData);
      })
      .catch((error) => {
        console.error("Error:", error); // Handling errors
        rl.close(); // Closing the readline interface on error
      });
   });
   