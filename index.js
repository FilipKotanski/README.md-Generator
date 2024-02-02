//required project dependencies

import inquirer from "inquirer";

import fs from "node:fs/promises";

import emailValidator from "email-validator";

import axios from "axios";

// transition table necessary to retrieve badges from shields.io

const licenseToBadgeTable = {

    "Academic Free License v3.0": "AFL30",
    "Apache license 2.0": "Apache20",
    "Artistic license 2.0": "Artistic20",
    "Boost Software License 1.0": "BSL10",
    "BSD 2-clause 'Simplified' license": "BSD2Clause",
    "BSD 3-clause 'New' or 'Revised' license": "BSD3Clause",
    "BSD 3-clause Clear license": "BSD3ClauseClear",
    "BSD 4-clause 'Original' or 'Old' license": "BSD4Clause",
    "BSD Zero-Clause license": "0BSD",
    "Creative Commons license family": "CC",
    "Creative Commons Zero v1.0 Universal": "CC01",
    "Creative Commons Attribution 4.0": "CCBY40",
    "Creative Commons Attribution ShareAlike 4.0": "CCBYSA40",
    "Do What The F*ck You Want To Public License": "WTFPL",
    "Educational Community License v2.0": "ECL20",
    "Eclipse Public License 1.0": "EPL10",
    "Eclipse Public License 2.0": "EPL20",
    "European Union Public License 1.1": "EUPL11",
    "GNU Affero General Public License v3.0": "AGPL30",
    "GNU General Public License family": "GPL",
    "GNU General Public License v2.0": "GPL20",
    "GNU General Public License v3.0": "GPL30",
    "GNU Lesser General Public License family": "LGPL",
    "GNU Lesser General Public License v2.1": "LGPL21",
    "GNU Lesser General Public License v3.0": "LGPL30",
    "ISC": "ISC",
    "LaTeX Project Public License v1.3c": "LPPL13c",
    "Microsoft Public License": "MSPL",
    "MIT": "MIT",
    "Mozilla Public License 2.0": "MPL20",
    "Open Software License 3.0": "OSL30",
    "PostgreSQL License": "PostgreSQL",
    "SIL Open Font License 1.1": "OFL11",
    "University of Illinois/NCSA Open Source License": "NCSA",
    "The Unlicense": "Unlicense",
    "zLib License": "Zlib"

  };

// transition table necessary to get a link to the selected license 

const licenseToUrlTable = {

    "Academic Free License v3.0": "https://opensource.org/licenses/AFL-3.0",
    "Apache license 2.0": "https://opensource.org/licenses/Apache-2.0",
    "Artistic license 2.0": "https://opensource.org/licenses/Artistic-2.0",
    "Boost Software License 1.0": "https://opensource.org/licenses/BSL-1.0",
    "BSD 2-clause 'Simplified' license": "https://opensource.org/licenses/BSD-2-Clause",
    "BSD 3-clause 'New' or 'Revised' license": "https://opensource.org/licenses/BSD-3-Clause",
    "BSD 3-clause Clear license": "https://opensource.org/licenses/BSD-3-Clause-Clear",
    "BSD 4-clause 'Original' or 'Old' license": "https://opensource.org/licenses/BSD-4-Clause",
    "BSD Zero-Clause license": "https://opensource.org/licenses/0BSD",
    "Creative Commons license family": "https://creativecommons.org/",
    "Creative Commons Zero v1.0 Universal": "https://creativecommons.org/publicdomain/zero/1.0/",
    "Creative Commons Attribution 4.0": "https://creativecommons.org/licenses/by/4.0/",
    "Creative Commons Attribution ShareAlike 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    "Do What The F*ck You Want To Public License": "http://www.wtfpl.net/",
    "Educational Community License v2.0": "https://opensource.org/licenses/ECL-2.0",
    "Eclipse Public License 1.0": "https://opensource.org/licenses/EPL-1.0",
    "Eclipse Public License 2.0": "https://opensource.org/licenses/EPL-2.0",
    "European Union Public License 1.1": "https://opensource.org/licenses/EUPL-1.1",
    "GNU Affero General Public License v3.0": "https://opensource.org/licenses/AGPL-3.0",
    "GNU General Public License family": "https://opensource.org/licenses/GPL",
    "GNU General Public License v2.0": "https://opensource.org/licenses/GPL-2.0",
    "GNU General Public License v3.0": "https://opensource.org/licenses/GPL-3.0",
    "GNU Lesser General Public License family": "https://opensource.org/licenses/LGPL",
    "GNU Lesser General Public License v2.1": "https://opensource.org/licenses/LGPL-2.1",
    "GNU Lesser General Public License v3.0": "https://opensource.org/licenses/LGPL-3.0",
    "ISC": "https://opensource.org/licenses/ISC",
    "LaTeX Project Public License v1.3c": "https://opensource.org/licenses/LPPL-1.3c",
    "Microsoft Public License": "https://opensource.org/licenses/MS-PL",
    "MIT": "https://opensource.org/licenses/MIT",
    "Mozilla Public License 2.0": "https://opensource.org/licenses/MPL-2.0",
    "Open Software License 3.0": "https://opensource.org/licenses/OSL-3.0",
    "PostgreSQL License": "https://opensource.org/licenses/PostgreSQL",
    "SIL Open Font License 1.1": "https://opensource.org/licenses/OFL-1.1",
    "University of Illinois/NCSA Open Source License": "https://opensource.org/licenses/NCSA",
    "The Unlicense": "https://opensource.org/licenses/Unlicense",
    "zLib License": "https://opensource.org/licenses/Zlib"

  };

// table of all license names
  
const allLinceseFullNames = Object.keys(licenseToUrlTable);
  
//creating an array of questions with user input validation used in the inquirer

function createQuestions() {

    let questions = [

        {

            type: "input",

            message: "What is your project title:",

            name: "title",

            validate: function(title){
                
               return isUserInputEmpty(title);

            }

        },

        {

            type: "input",

            message: "Provide description for your project:",

            name: "description",

            validate: function(description){
                
                return isUserInputEmpty(description);
 
             }

        },

        {

            type: "input",

            message: "Provide installation instructions:",

            name: "installation",

            validate: function(instructions){
                
                return isUserInputEmpty(instructions);
 
             }

        },

        {

            type: "input",

            message: "Enter usage information:",

            name: "usage",

            validate: function(usage){
                
                return isUserInputEmpty(usage);
 
             }

        },

        {

            type: "input",

            message: "How can other developers contribute:",

            name: "contributing",

            validate: function(contributing){
                
                return isUserInputEmpty(contributing);
 
             }

        },

        {

            type: "input",

            message: "Provide examples of how to run tests for your project:",

            name: "testing",

            validate: function(testing){
                
                return isUserInputEmpty(testing);
 
             }

        },

        {
            type: "list",

            message: "Choose a license:",

            name: "license",

            choices: allLinceseFullNames

        },

        {

            type: "input",

            message: "What is your GitHub username:",

            name: "username",

            validate: async function(username){

                if(!username){

                    return "GitHub username cannot be an empty string!"

                }

                const isValid = await validateGitHubUsername(username);

                return isValid ? true : "Invalid GitHub username!"

            }

        },

        {

            type: "input",

            message: "What is your email address:",

            name: "email",

            validate: function(email){
                
                return validateEmail(email);

            }

        }
        
    ];

    return questions;

}

// functions validating user input

function isUserInputEmpty(input){

    return input.trim() !== "" ? true: "Cannot accept an empty string!";

}

function validateEmail(input){

    return emailValidator.validate(input) ? true : `Email: ${input} is not valid.`

}

async function validateGitHubUsername(input){

    try
    
    {

        const response = await axios.get(`https://api.github.com/users/${input}`);

        return response.status === 200;

    }

    catch(error)
    
    {

        return false;

    }

}

// fuction generating CLI, collecting user input and returning the answers

async function promptUser(questions) {

    let answers = {};

    answers = await inquirer.prompt(questions);

    return answers;

}

//function generating README.md file base on a given string literal template

function generateREADME(answers) {

    const licenseBadge = licenseToBadgeTable[answers.license];

    const licenseUrl = licenseToUrlTable[answers.license];

    const markdown = 
    
`# ${answers.title} <sup>[![License](https://img.shields.io/badge/License-${licenseBadge}-blue.svg)](${licenseUrl})</sup>

## Description

${answers.description}

## Table of Contents 

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)

- [Contributing](#contributing)

- [Tests](#tests)

- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is licensed under the [${answers.license}](${licenseUrl}).

## Contributing

${answers.contributing}

## Tests

${answers.testing}
    
## Questions

**[${answers.username}](https://github.com/${answers.username})**

For questions and bugs reporting get in touch via email at *[${answers.email}](mailto:${answers.email} "Feel free to reach out!").*`;

    return markdown;

}

//saving README.md file 

async function writeToFile(filename, markdown) {

    try {

        await fs.writeFile(filename, markdown);

    }

    catch (err) {

        console.log("Error writing to file", err);

    }

}

//function controlling the flow of the program

async function main() {

    const questions = createQuestions();

    const answers = await promptUser(questions);

    const markdown = generateREADME(answers);

    writeToFile("README.md", markdown);

}

main();
