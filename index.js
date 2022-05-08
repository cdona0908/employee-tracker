//Node Module for inquirer to prompt user
const inquirer = require('inquirer');
//const mysql = require("mysql2");
const connection = require('./db/connection');
//Access to DB class with query functions
// const db = require('./db/index');

// Start server after DB connection
connection.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    promptMainMenu();    
});


function promptMainMenu() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ["View all departments",
                      "View all roles",
                      "View all employees", 
                      "Add a department", 
                      "Add a role", 
                      "Add an employee",
                      "Update an employee role"]
        }
    ]).then(console.log ("this is a test"))
    // {
    //     switch (selection.choices){
    //         case "View all departments":
    //             console.log("option 1 selected");
    //             //db.getAllDepartments();
    //         break;


    //     }
    // })

   

}

