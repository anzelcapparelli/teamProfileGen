const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const members = [];
let id = 0;

function mainMenu() {

    // qudestion that either adds another employee

    inquirer
        .prompt([

            {
                type: "list",
                message: "Add another team member?",
                choices: ["Add new team member", "I'm done- make my html please!"],
                name: "repeater"

            }

        ])

        .then(answers => {
            if (answers.repeater === "Add new team member") {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Select role of new team member:",
                            choices: ["Engineer", "Intern"],
                            name: "roleType"
                        }
                    ])
                    .then(answers => {
                        employeeAdder(answers.roleType);
                    })
            }

            else {
                // does if done
                console.log(members);
            }
        })

        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
                console.error(error);
            }
        });

}

function uniqueQ(role) {
    switch (role) {
        case "Manager":
            return {
                type: "input",
                message: `Please enter office number for ${role}:`,
                name: "unique"
            };
        case "Engineer":
            return {
                type: "input",
                message: `Please enter github username for ${role}:`,
                name: "unique"
            };
        default:
            return {
                type: "input",
                message: `Please enter school for ${role}:`,
                name: "unique"
            };

    }
}

function employeeAdder(role) {

    // ask questions, add info to employee arr, then
    id++;

    inquirer
        .prompt([

            {
                type: "input",
                message: `Please enter name for ${role}:`,
                name: "name"
            },
            {
                type: "input",
                message: `Please enter email for ${role}:`,
                name: "email"
            },
            uniqueQ(role)

            // ================================================================================================
            // add additional questions! different questions based on diff role vals
            // enter email, then enter unique

        ])
        .then(answers => {
            // put into appropriate constructor! func(answers.name, id, answers.email, answers.unique)

            function constrPikr (role) {
                switch (role) {

                    case "Manager":
                        return new Manager(answers.name, id, answers.email, answers.unique);

                    case "Engineer":
                        return new Engineer(answers.name, id, answers.email, answers.unique);

                    default:
                        return new Intern(answers.name, id, answers.email, answers.unique);
                        
                }
            }

            members.push(constrPikr(role));
            mainMenu();

        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
                console.error(error);
            }
        });

}


employeeAdder("Manager");

// as initializer, call employeeAdder with 


// ================================================================================================
// instructions

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
