const inquirer = require('inquirer'); //inquirer for use in console
const fs = require('fs'); //file system support for writing files
const util = require('util');

const writeFile = util.promisify(fs.writeFile); //used to write to the required file. Will wait until the file is written completely before continuing.

//gathers the user prompts to create the readme file.
const userPrompt = () => {
    return inquirer.prompt([
        {
            type: "input", //basic text input
            name: "title",
            message: "Welcome to the readme generator. \nIf you do not need a section, please leave the response blank for that section. \nPlease enter the title of your project: "
        },
        {
            type: "input", //open the users' prefered text editor to write longer answers. Close and save in the editor to save the answer
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
            type: "input",
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
    let earlyText = `# ${answers.title}\n \n`; //text before table of contents
    let lateText = ""; //text after table of contents
    let contentsText = ""; //used to hold the list of valid sections
    //project description
    if(answers.description.trim() != "")
    {
        console.log("Creating section: description");
        earlyText = earlyText.concat(earlyText, `## **Description**\n
        ${answers.description}\n`);
        contentsText = contentsText + ("* Description\n"); //appends description to the table of contents
    }
    //installation instructions
    if(answers.installation.trim() != "")
    {
        console.log("Creating section: installation");
        lateText = lateText + (`## **Installation Instructions**\n
        ${answers.installation}\n`);
        contentsText = contentsText + ("* Installation Instructions\n");
    }
    //usage requirements
    if(answers.usage.trim() != "")
    {
        console.log("Creating section: usage");
        lateText = lateText + (`## **Usage**\n
        ${answers.usage}\n`);
        contentsText = contentsText + ("* Usage\n");
    }
    //license used (Always included)
    console.log("Creating section: license");
    lateText = lateText + (`## **License**\n
    Using license: ${answers.license} License\n`);
    contentsText = contentsText + ("* License\n");
    //contributors
    if(answers.contributors.trim() != "")
    {
        console.log("Creating section: contributors");
        lateText = lateText + (`## **Contributors**\n
        ${answers.contributors}\n`);
        contentsText = contentsText + ("* Contributors\n");
    }
    //testing
    if(answers.tests.trim() != "")
    {
        console.log("Creating section: Tests");
        lateText = lateText + (`## **Tests**\n
        ${answers.tests}\n`);
        contentsText = contentsText + ("* Tests\n");
    }
    //questions
    if(answers.questions.trim() != "")
    {
        console.log("Creating section: questions");
        lateText = lateText + (`## **Questions**\n
        ${answers.tests}\n`);
        contentsText = contentsText + ("* Questions\n");
    }
    //finalising the generation
    contentsText = `## **Table of Contents**\n
    ${contentsText}`;
    const readmeText = earlyText + contentsText + lateText; //combine all texts together
    return readmeText; //returns the finalised string
}
const start = async () =>
{
    console.log("Starting readme generator");
    try {
        const answers = await userPrompt(); //gather prompts for generating the file
        //!Delete this log when file write is complete.
        console.log(`Current answers are: ${JSON.stringify(answers)}`); //logs current responses to the console for testing purposes.
        const readme = generateReadme(answers); //generate the readme based on the results
        console.log(`The readme is this: ${readme}`);
        //!TODO: Create write functionality.
    }
    catch (error) {
        console.error(error);
    }
};
start();