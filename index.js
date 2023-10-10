const inquirer = require('inquirer'); //inquirer for use in console
const fs = require('fs'); //file system support for writing files
const util = require('util');

//gathers the user prompts to create the readme file.
const userPrompt = () => {
    return inquirer.prompt([
        {
            type: "input", //basic text input
            name: "title",
            message: "Welcome to the readme generator. \nIf you do not need a section, please leave the response blank for that section. \nPlease enter the title of your project: "
        },
        {
            type: "editor", //open the users' prefered text editor to write longer answers. Close and save in the editor to save the answer
            name: "description",
            message: "Enter the description of your project: "
        },
        {
            type: "editor",
            name: "installation",
            message: "Enter the installation instructions: "
        },
        {
            type: "editor",
            name: "usage",
            message: "Enter the usage guidelines: "
        },
        {
            type: "list", //creates a list of some of the most frequent license types on GitHub
            name: "license",
            message: "Which license would you like to use?",
            choices: ["MIT", "GPLv2", "Apache", "GPLv3", "Other"] //taken from the top github licenses
        },
        {
            type: "input",
            name: "contributors",
            message: "Please list any contributors: "
        },
        {
            type: "input",
            name: "tests",
            message: "Please list any tests: "
        },
        {
            type: "editor",
            name: "questions",
            message: "Please list any frequently asked questions"
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
        //!Delete this log when file write is complete.
        console.log(`Current answers are: ${JSON.stringify(answers)}`); //logs current responses to the console for testing purposes.
        const readme = generateReadme(answers); //generate the readme based on the results

        //!TODO: Create write functionality.
    }
    catch (error) {
        console.error(error);
    }
};
start();