//DDBB functions for SQL queries goes here
const connection = require("./connection");
class DB {
    constructor(connection){
        this.connection= connection;
    }
    // Get All Departments from the database
    getAllDepartments () {
        console.log("connected to db queries");
        connection.query(" SELECT * FROM department;"),
        function(err, res){
            if (err) throw err
            console.log(res)
        }
       
    }
    //Get all roles from the database
    getAllRoles () {
        return this.connection.promise().query(
            " SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id",
        );
    }
    //Get all employees from the database
    getAllEmployees(){
        return this.connection.promise().query(
            " SELECT SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT( manager.first_name, ' ', manager.last_name) AS Manager_Name FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id "
        );
    }





};

module.exports = DB;