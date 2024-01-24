// Function to dynamically create a class.
// It takes two arguments: className (a string representing the name of the class)
// and attributes (an array of strings representing property names for the class).
function createDynamicClass(className, attributes) {
  // Returns a new constructor function. This function will act as the constructor
  // for the new class. It's a function that takes dynamic arguments.
  return function () {
    // Iterates over each attribute and creates a property of the same name
    // on the class instance. The values of these properties are assigned
    // from the arguments passed to the constructor.
    attributes.forEach((attr, index) => {
      this[attr] = arguments[index]; // Assigning values to properties
    });
  };
}

// Exporting the createDynamicClass function so it can be used in other files.
module.exports = createDynamicClass;
