const inquirer = import("inquirer"); //inquirer for use in console
const fs = require('fs'); //file system support for writing files
const util = require('util');

const userPrompt = () => {
    return inquirer.prompt([
        "Hi there, write something"
    ])
    .then((answers) => {
        console.log(`You put: ${answers}`);
    })
    .catch((error) => {
        if(error.isTtyError)
        {
            console.error("Prompt cannot be rendered in current environment, please try again.");
        }
        else
            console.error(`Something went wrong \n + error`);
    });
}
function generateReadme()
{

}
const start = async () =>
{
    console.log("Starting readme generator");
    try {
        const answers = await userPrompt();
        const readme = generateReadme(answers);
    }
}
start();