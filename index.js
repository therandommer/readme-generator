const inquirer = require('inquirer'); //inquirer for use in console
const fs = require('fs'); //file system support for writing files
const util = require('util');

const userPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Welcome to the readme generator. \n Please enter the title of your project: "
        },
        {
            type: "input",
            name: "description",
            message: "Enter the description of your project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Enter the installation instructions: "
        },
        {
            type: "input",
            name: "usage",
            message: "Enter the usage guidelines: "
        },
        {
            type: "list",
            name: "license",
            message: "Which license would you like to use?",
            choices: ["MIT", "GPLv2", "Apache", "GPLv3", "Other"] //taken from the top github licenses
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
    //!TODO: Create readme generation logic.
    return answers;
}
const start = async () =>
{
    console.log("Starting readme generator");
    try {
        const answers = await userPrompt(); //gather prompts for generating the file
        console.log(`Current answers are: ${JSON.stringify(answers)}`);
        const readme = generateReadme(answers); //generate the readme based on the results

        //!TODO: Create write functionality.
    }
    catch (error) {
        console.error(error);
    }
};
start();