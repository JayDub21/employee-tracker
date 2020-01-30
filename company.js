const inquirer = require('inquirer');
const mysql = require('mysql');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//                NPM Packages
//=================================================
//        Setting Up Connection Variable
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dbpassword",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    startProgram();
});




// Start by asking which operation the User would like to perform

startProgram = () => {
    inquirer.prompt([
        {
            name: 'operation',
            type: 'list',
            message: 'Which operation would you like to perform?',
            choices: [
                'Add a New Employee',
                'Add a New Role',
                'Add a New Department',
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Update Employee Role',
            ]

        }
    ]).then((data) => {
        // console.log(data);
        const operation = data.operation;
        switch (operation) {
            case 'Add a New Employee':
                return newEmployeePrompt()

            case 'Add a New Role':
                return newRolePrompt()

            case 'Add a New Department':
                return newDeptPrompt()

            case 'View All Employees':
                return viewEmployee()

            case 'View All Roles':
                return viewRoles()

            case 'View All Departments':
                return viewDept()
            case 'Update Employee Role':
                return updateEmployeeRole()
        }
    })
};

// 



//=================================================
//  New Employee Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
newEmployeePrompt = () => {

    // Show the role table to assist answering role_id?
    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res);

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employees first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is your employees last name?'
            },
            {
                name: 'role_id',
                type: 'list',
                // Need to replace with a list where message displays created roles
                message: 'What is the Role ID# for this employee?'
            }

        ]).then((data) => {

            connection.query(

                "INSERT INTO employee SET ?",
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role_id: data.role_id
                },
                function (err) {

                    if (err) throw err;
                    console.log(`New employee ${data.first_name} was created successfully!`);
                    startProgram()
                })


        })
    })
}



//======================================================
// updateEmployeeRole Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
updateEmployeeRole = () => {

    connection.query("SELECT * FROM employee", function (err, res) {
        let nameList = [];


        for (let i = 0; i < res.length; i++) {
            nameList.push(res[i].id);
        }
        console.log("name list: " + nameList);

        inquirer.prompt([
            {
                name: 'currID',
                type: 'list',
                message: 'What is the ID of the employee you would like to update?',
                choices: nameList
            },

            {
                name: 'updateRole',
                type: 'number',
                message: 'What is the new Rold ID# ?',

            },

        ]).then((data) => {
            console.log("data choices: " + data.currID);
            console.log(data.updateRole);
            const newRoleId = data.updateRole
            const currID = data.currID

            //UPDATE employee SET role_id = newRoleID WHERE id = currID
            connection.query('UPDATE employee SET ? WHERE ?',
                [
                    { role_id: newRoleId },

                    { id: currID }
                ],

                function (err) {

                    if (err) throw err;
                    console.log(`New employee Role #${data.updateRole} was created successfully!`);
                    startProgram()
                })
        })
    })
}




//=================================================
//    New Role Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
newRolePrompt = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the new role title?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this position?'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the department ID# for the role?'
        }

    ]).then((data) => {

        connection.query(

            "INSERT INTO role SET ?",
            {
                title: data.title,
                salary: data.salary,
                department_id: data.department_id
            },
            function (err) {

                if (err) {
                    return reject(err);
                }
                else {
                    console.log(`New ${data.title} Role was created successfully!`);
                    startProgram();
                }


            })

    })
};



//=================================================
// New Department Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
newDeptPrompt = () => {
    inquirer.prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'What is the name of the new Department?'
        },

    ]).then((data) => {



        connection.query(

            "INSERT INTO departments SET ?",
            {
                deptName: data.deptName,
            },
            function (err) {

                if (err) {
                    return reject(err);
                }
                else {
                    console.log(`New ${data.deptName} Department was created successfully!`);
                    startProgram()
                }


            })
    })
};



//=================================================
//   viewRoles Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
viewRoles = () => {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        console.table(res);
        startProgram()
    })

};



//=================================================
//   viewDept Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
viewDept = () => {

    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;

        console.table(res);
        startProgram()
    })

};



//=================================================
//   viewEmployee Function Prompts for user input,
//     then adds input data to employee table
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
viewEmployee = () => {

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        console.table(res);
        startProgram()
    })

};

