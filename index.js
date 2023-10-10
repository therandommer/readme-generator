const inquirer = require('inquirer'); //inquirer for use in console
const fs = require('fs'); //file system support for writing files
const util = require('util');

const userPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Hi there, write something"
        }
    ])
    .catch((error) => {
        if(error.isTtyError)
        {
            console.error("Prompt cannot be rendered in current environment, please try again.");
        }
        else
            console.error(`Something went wrong \n + error`);
    });
}
function generateReadme(answers)
{

}
const start = async () =>
{
    console.log("Starting readme generator");
    try {
        const answers = await userPrompt();
        console.log(`Current answers are: ${JSON.stringify(answers)}`);
        const readme = generateReadme(answers);
    }
    catch (error) {
        console.error(error);
    }
};
start();