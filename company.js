const inquirer = require('inquirer');
const mysql = require('mysql');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//                NPM Packages
//=================================================
//        Setting Up Connection Variable
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "dbpassword",
//     database: "company_db"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);

//     startProgram();
// });


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
                'View All Departments'
            ]

        }
    ]).then((data) => {
        // console.log(data);
        const operation = data.operation;
        switch (operation) {
            case 'Add a New Employee':
                newEmployeePrompt();
                break;
        }
    })
};

startProgram();

newEmployeePrompt = () => {
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
            name: 'role',
            type: 'input',
            // Need to replace with a list where message displays created roles
            message: 'What is the employees role?'
        }
    ]).then((data) => {

        // Set first_name to var
        const first_name = data.first_name;
        console.log(first_name);

        // Set lasnt_name to var
        const last_name = data.last_name;
        console.log(last_name);

        // Set role to var
        const role = data.role;
        console.log(role);



    }).then(() => {

        newEmployee = () => {

            connection.query(

                "INSERT INTO employee SET ?",
                {
                    first_name: first_name,
                    last_name: last_name,
                    role: role
                },
                function (err) {

                    if (err) throw err;
                    console.log(`${first_name}'s Profile was created successfully!`);

                }).then(() => {
                    startProgram();
                })
        }
    })
};

