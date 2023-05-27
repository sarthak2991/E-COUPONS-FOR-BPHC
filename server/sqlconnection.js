const mysql = require('mysql')

const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sarthug@1'
})

module.exports = connect 