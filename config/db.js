const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "be-test-case"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("Connected!");
    
})