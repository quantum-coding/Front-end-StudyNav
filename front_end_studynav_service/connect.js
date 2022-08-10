var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlhwc2097',
    database: 'studynav'
})


module.exports = connection