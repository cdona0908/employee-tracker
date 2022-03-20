//Node Module for inquirer to prompt user
const inquirer = require('inquirer');

//Access to DB class with query functions
const db = require('./db/index');

const promptMainMenu = () => {

    const choice = inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    );

    if(choice.option === "View all departments"){
        getAllDepartments().then((result) => {
            console.log("departments", result);
        })
    }
    else {
        return;
    }  
        

}

promptMainMenu();