const parseQuery = (query) => {
  if (query.startsWith("select")) {
    const pattern = /select\s+(.*?)\((.*?)\)/i;
    const match = pattern.exec(query);

    if (match) {
      const conditionStr = match[1].trim();
      const tableName = match[2].trim();

      // Convert condition string into a function
      const condition = new Function("row", `return ${conditionStr}`);

      return {
        operation: "select",
        tableName: tableName,
        condition: condition,
      };
    } else {
      throw new Error("Invalid query format");
    }
  } else if (query.toLowerCase().startsWith("project")) {
    const pattern = /project\s+(.*?)\((.*?)\)/i;
    const match = pattern.exec(query);

    if (match) {
      const attributesStr = match[1].trim();
      const tableName = match[2].trim();
      const attributes = attributesStr.split(",").map((attr) => attr.trim());

      return {
        operation: "project",
        tableName: tableName,
        params: attributes,
      };
    } else {
      throw new Error("Invalid query format for project operation");
    }
  } else if (query.toLowerCase().startsWith("cartesianproduct")) {
    const pattern = /cartesianProduct\s+(\S+)\s+(\S+)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      return {
        operation: "cartesianProduct",
        tables: [table1, table2],
      };
    } else {
      throw new Error("Invalid query format for cartesianProduct operation");
    }
  } else if (query.toLowerCase().startsWith("innerjoin")) {
    const pattern = /innerJoin\s+(.*?)\s+(.*?)\s+on\s+(.*)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      const joinCondition = match[3].trim();
      return {
        operation: "innerJoin",
        params: {
          table1,
          table2,
          joinCondition,
        },
      };
    } else {
      throw new Error("Invalid query format for innerJoin operation");
    }
  } else if (query.toLowerCase().startsWith("leftouterjoin")) {
    const pattern = /leftOuterJoin\s+(.*?)\s+(.*?)\s+on\s+(.*)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      const joinCondition = match[3].trim();
      return {
        operation: "leftOuterJoin",
        params: {
          table1,
          table2,
          joinCondition,
        },
      };
    } else {
      throw new Error("Invalid query format for leftOuterJoin operation");
    }
  } else if (query.toLowerCase().startsWith("rightouterjoin")) {
    const pattern = /rightOuterJoin\s+(.*?)\s+(.*?)\s+on\s+(.*)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      const joinCondition = match[3].trim();
      return {
        operation: "rightOuterJoin",
        params: {
          table1,
          table2,
          joinCondition,
        },
      };
    } else {
      throw new Error("Invalid query format for rightOuterJoin operation");
    }
  } else if (query.toLowerCase().startsWith("intersection")) {
    const pattern = /intersection\s+(\S+)\s+(\S+)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      return {
        operation: "intersection",
        tables: [table1, table2],
      };
    } else {
      throw new Error("Invalid query format for intersection operation");
    }
  } else if (query.toLowerCase().startsWith("union")) {
    const pattern = /union\s+(\S+)\s+(\S+)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      return {
        operation: "union",
        tables: [table1, table2],
      };
    } else {
      throw new Error("Invalid query format for union operation");
    }
  } else if (query.toLowerCase().startsWith("minus")) {
    const pattern = /minus\s+(\S+)\s+(\S+)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      return {
        operation: "minus",
        tables: [table1, table2],
      };
    } else {
      throw new Error("Invalid query format for minus operation");
    }
  } else if (query.toLowerCase().startsWith("divide")) {
    const pattern = /divide\s+(\S+)\s+(\S+)\s*,\s*(\S+)$/i;
    const match = pattern.exec(query);
    if (match) {
      const table1 = match[1].trim();
      const table2 = match[2].trim();
      const commonAttribute = match[3].trim();
      return {
        operation: "divide",
        table1: table1,
        table2: table2,
        commonAttribute: commonAttribute,
      };
    } else {
      throw new Error("Invalid query format for divide operation");
    }
  } else if (query.toLowerCase().startsWith("count")) {
    const pattern = /count\s+(\S+)\((\S+)\)$/i;
    const match = pattern.exec(query);
    if (match) {
      const attribute = match[1].trim();
      const tableName = match[2].trim();
      return {
        operation: "count",
        tableName: tableName,
        params: attribute,
      };
    } else {
      throw new Error("Invalid query format for count operation");
    }
  } else if (query.toLowerCase().startsWith("groupby")) {
    const pattern = /groupby\s+(\S+)\((\S+)\)$/i;
    const match = pattern.exec(query);
    if (match) {
      const attributes = match[1].split(",").map((attr) => attr.trim());
      const tableName = match[2].trim();
      return {
        operation: "groupBy",
        tableName: tableName,
        params: attributes,
      };
    } else {
      throw new Error("Invalid query format for groupBy operation");
    }
  } else if (query.toLowerCase().startsWith("having")) {
    const pattern = /having\s+(.*?)\s+groupBy\s+(.*?)\((.*?)\)/i;
    const match = pattern.exec(query);
    if (match) {
      const conditionStr = match[1].trim();
      const groupAttributes = match[2].split(",").map(attr => attr.trim());
      const tableName = match[3].trim();
      const condition = new Function("group", `return ${conditionStr}`);
  
      return {
        operation: "having",
        tableName: tableName,
        groupAttributes: groupAttributes,
        params: condition,
      };
    } else {
      throw new Error("Invalid query format for having operation");
    }
  }
   else if (query.toLowerCase().startsWith("rename")) {
    const pattern = /rename\s+(\w+)\s+as\s+(\w+)\((.*?)\)/i;
    const match = pattern.exec(query);
    if (match) {
      const oldName = match[1].trim();
      const newName = match[2].trim();
      const tableName = match[3].trim();

      return {
        operation: "rename",
        tableName: tableName,
        params: {
          [oldName]: newName,
        },
      };
    } else {
      throw new Error("Invalid query format for rename operation");
    }
  } else {
    throw new Error("Invalid query format for rename operation");
  }
};

module.exports = parseQuery;
