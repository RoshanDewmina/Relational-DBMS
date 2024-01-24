make this more general and not to the point
maybe rewrite in c++?
//add the other functionalites for the operations file
make the data structure part dynamic by... the program would create a class automatically by whatever input we give when we give for example, we give a relation like this, "Employees (EID, Name, Age) = {
E1, John, 32
E2, Alice, 28
E3, Bob, 29
}"  the program would automatically create a class for that specific input and when we exit the program, that can be deleted and when we open the application again we can ask for input for a relation, of eg  Employees with the attributes EID, Name, Age and the objects E1, E2, E3 with the values John, Alice, Bob respectively, then afterwards we can give queries like "select Age>30(Employees)", and then itll know that you hva ot use Select operation on the class Employees with the condition Age>30, but not onlu limited to that, i dont want it to be jard coded, like what if the query was, "prgoject id=2(Employees)"
i cant hard code each of these conditions by hand so i need a system thatll hadle these conditions 



function createDynamicClass(attributes, data) {
    function DynamicClass() {
        attributes.forEach((attr, index) => {
            this[attr] = data[index];
        });
    }

    return DynamicClass;
}

function parseAndCreateInstances(relationInput) {
    let lines = relationInput.split("\n");
    let [header, ...rows] = lines;
    let attributes = header.split(", ");
    let instances = [];

    rows.forEach(row => {
        let data = row.split(", ");
        let DynamicClass = createDynamicClass(attributes, data);
        instances.push(new DynamicClass());
    });

    return instances;
}

function executeQuery(instances, query) {
    let [operation, rest] = query.split(/\s+(.+)/);
    switch (operation.toLowerCase()) {
        case 'select':
            let condition = new Function('instance', `return ${rest}`);
            return instances.filter(instance => condition(instance));
        case 'project':
            let attributes = rest.split(',').map(attr => attr.trim());
            return instances.map(instance => {
                let projected = {};
                attributes.forEach(attr => projected[attr] = instance[attr]);
                return projected;
            });
        // Add more cases as needed
        default:
            return [];
    }
}

module.exports = executeQuery;


const readline = require('readline');
const parseAndCreateInstances = require('./parseInput');
const executeQuery = require('./executeQuery');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let instances = [];

rl.question('Enter your relation definition:\n', (input) => {
    instances = parseAndCreateInstances(input);

    rl.question('Enter your query:\n', (query) => {
        let result = executeQuery(instances, query);
        console.log('Query Result:', result);

        rl.close();
    });
});
