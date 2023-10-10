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
            message: "Welcome to the readme generator. \nIf you do not need a section, please leave the response blank for that section, or enter 'None' in your response. \nPlease enter the title of your project: "
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
    let earlyText = `# ${answers.title}\n \n`; //text before table of contents
    let lateText = ""; //text after table of contents
    let contentsText = "";
    if(answers.description.trim() != "" ||  answers.description.trim().toLowerCase() != "none")
    {
        earlyText.concat(`## **Description**\n
        \n
        ${answers.description}\n
        \n`);
        contentsText.concat("* Description\n"); //appends description to the table of contents
    }
    if(answers.installation.trim() != "" ||  answers.installation.trim().toLowerCase() != "none")
    {
        lateText.concat(`## **Installation Instructions**\n
        \n
        ${answers.installation}\n
        \n`);
        contentsText.concat("* Installation Instructions\n");
    }
    if(answers.usage.trim() != "" ||  answers.usage.trim().toLowerCase() != "none")
    {
        lateText.concat(`## **Usage**\n
        \n
        ${answers.usage}\n
        \n`); 
        contentsText.concat("* Usage\n");
    }
    lateText.concat(`## **License**\n
    \n
    Using license: ${answers.license} License\n
    \n`)
    contentsText.concat("* License\n");
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