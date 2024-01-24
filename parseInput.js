const createDynamicClass = require("./dynamicClassCreator");

function parseAndCreateInstances(input) {
  let lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  let [header, ...rows] = lines;
  let [className, attributesStr] = header.split("(");
  let attributes = attributesStr
    .split(/,|\)/)
    .map((attr) => attr.trim())
    .filter((attr) => attr);

  let Class = createDynamicClass(className, attributes);
  return rows.map(
    (row) => new Class(...row.split(",").map((item) => item.trim()))
  );
}

module.exports = parseAndCreateInstances;
