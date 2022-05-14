//Node Module for inquirer to prompt user
const inquirer = require('inquirer');
//Set up db connection
const connection = require('./db/connection');
//format table in console
const table = require('console.table');



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
    ]).then( response => {
        switch (response.option){
            case "View all departments": 
                getAllDepartments();
                break;
            case "View all roles":
                getAllRoles();
                break;
            case "View all employees":
                getAllEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;    
            case "Update an employee role":
                updateEmployeeRole();
                break;  
        }
    }        
    )   
};

// Get All Departments from the database
function getAllDepartments () {
    const sql = `SELECT * FROM department`;
    
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMainMenu();
    });
    
};

//Get all roles from the database
function getAllRoles () {
    const sql = `SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMainMenu();
    });
};
//Get all employees from the database
function getAllEmployees(){
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT( manager.first_name, ' ', manager.last_name) AS Manager_Name FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMainMenu();
    });
};

// Add a department to the database
function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please enter the department name'
        }
    ]).then(res =>{
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = res.departmentName;
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log('Department successfully added!');                        
            promptMainMenu();
        })

    })
    
};

// Add a role to the database
function addRole(){
    
    //query all the departments
    connection.query('SELECT * FROM department', (err, res)=>{
        if (err) throw err;                    

        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter the role name'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Please enter the salary for this role'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department of this role?',
                choices: function() {
                    var departmentArr = [];
                    for (let i = 0; i < res.length; i++) {
                        departmentArr.push(res[i].name);
                    }
                    return departmentArr;
                }           
            }            

        ]).then(new_role => {
            let departmentId;   
            
            // get id of department selected
            for (let i=0; i < res.length; i++){
                if (new_role.department == res[i].name){
                    departmentId = res[i].id;
                    console.log('department Id', departmentId); 
                }
            }
            const sql = `INSERT INTO ROLE (title, salary, department_id) VALUES (?,?,?)`;
            const params = [
                new_role.roleName,
                new_role.roleSalary,
                departmentId
            ]; 
            connection.query(sql, params,(err, res)=>{
                if (err) throw err;
                console.log('Role successfully added!'); 
                promptMainMenu();
            });

        });       
        
    });    
};

// Add an employee to the database
function addEmployee(){
    connection.query('SELECT * FROM role', (err, res)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Please enter the employee's name"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Please enter the employee's last name"
            },            
            {
                type: 'list',
                name: 'role',
                message: 'What is role of this employee?',
                choices: function() {
                    var roleArr = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArr.push(res[i].title);
                    }
                    return roleArr;
                }           
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "Please enter the employee's manager's ID"
            }            

        ]).then(new_employee => {
            let role_id;
            // get id of role selected
            for (let i=0; i < res.length; i++){
                if (new_employee.role == res[i].title){
                    role_id = res[i].id;
                    console.log(role_id);
                }
            }
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?,?,?,?)`;
            const params = [
                new_employee.first_name,
                new_employee.last_name,
                role_id,
                new_employee.manager_id
            ];
            connection.query(sql, params,(err,res)=>{
                if(err) throw err;
                console.log('Employee successfully added!');
                promptMainMenu();
            }) 
        });

    });
};

// Update an employee role in the database
function updateEmployeeRole(){
    const sql = ``;
};