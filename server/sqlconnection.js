// importing module
const mysql = require('mysql')

// defining a constant for sql connection
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sarthug@1'
})

module.exports = connect 