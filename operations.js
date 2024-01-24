const select = (relation, condition) => {
  return relation.filter(condition);
};

const project = (relation, attributes) => {
  return relation.map((row) => {
    let projectedRow = {};
    attributes.forEach((attr) => (projectedRow[attr] = row[attr]));
    return projectedRow;
  });
};

function cartesianProduct(setA, setB) {
  let product = [];

  setA.forEach((a) => {
    setB.forEach((b) => {
      // Combine objects a and b
      let combined = { ...a, ...b };
      product.push(combined);
    });
  });

  return product;
}

function innerJoin(setA, setB, condition) {
  let joinedSet = [];

  setA.forEach((a) => {
    setB.forEach((b) => {
      if (condition(a, b)) {
        let combined = { ...a, ...b };
        joinedSet.push(combined);
      }
    });
  });

  return joinedSet;
}

function leftOuterJoin(setA, setB, condition, attributesB) {
  let joinedSet = [];

  setA.forEach((a) => {
    let matchFound = false;

    setB.forEach((b) => {
      if (condition(a, b)) {
        joinedSet.push({ ...a, ...b });
        matchFound = true;
      }
    });

    if (!matchFound) {
      let nullExtendedB = attributesB.reduce(
        (obj, attr) => ({ ...obj, [attr]: null }),
        {}
      );
      joinedSet.push({ ...a, ...nullExtendedB });
    }
  });

  return joinedSet;
}

function rightOuterJoin(setA, setB, condition, attributesA) {
  let joinedSet = [];

  setB.forEach((b) => {
    let matchFound = false;

    setA.forEach((a) => {
      if (condition(a, b)) {
        joinedSet.push({ ...a, ...b });
        matchFound = true;
      }
    });

    if (!matchFound) {
      let nullExtendedA = attributesA.reduce(
        (obj, attr) => ({ ...obj, [attr]: null }),
        {}
      );
      joinedSet.push({ ...nullExtendedA, ...b });
    }
  });

  return joinedSet;
}

function intersection(setA, setB, compareFunction) {
  return setA.filter((a) => setB.some((b) => compareFunction(a, b)));
}
function defaultCompare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function minus(setA, setB, compareFunction = defaultCompare) {
  return setA.filter(a => !setB.some(b => compareFunction(a, b)));
}

function union(setA, setB, compareFunction = defaultCompare) {
  let combined = setA.concat(setB);
  return combined.filter((item, index) => 
    combined.findIndex(other => compareFunction(item, other)) === index
  );
}
function divide(setA, setB, commonAttribute) {
  // Find unique values in setB
  let uniqueBValues = [...new Set(setB.map((b) => b[commonAttribute]))];

  // Group setA by commonAttribute
  let groupedA = setA.reduce((groups, a) => {
    let key = a[commonAttribute];
    groups[key] = groups[key] || [];
    groups[key].push(a);
    return groups;
  }, {});

  // Find keys in groupedA that relate to all values in uniqueBValues
  return Object.keys(groupedA).filter((key) =>
    uniqueBValues.every((bVal) =>
      groupedA[key].some((a) => a[commonAttribute] === bVal)
    )
  );
}

function count(set, attribute) {
  return set.filter((item) => item[attribute] !== undefined).length;
}
function groupBy(set, attributes) {
  return set.reduce((groups, item) => {
    let key = attributes.map((attr) => item[attr]).join("-");
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}
function having(groups, condition) {
  return Object.keys(groups)
    .filter((key) => condition(groups[key]))
    .reduce((result, key) => {
      result[key] = groups[key];
      return result;
    }, {});
}
function rename(set, renames) {
  return set.map((item) => {
    let newItem = { ...item };
    Object.keys(renames).forEach((oldName) => {
      newItem[renames[oldName]] = newItem[oldName];
      delete newItem[oldName];
    });
    return newItem;
  });
}

module.exports = {
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
};
