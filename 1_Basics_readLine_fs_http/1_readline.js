const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a name: ", (name) => {
    console.log(name);
    rl.close();
});
