const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST_WHATS,
    user: process.env.DB_USER_WHATS,
    password: process.env.DB_PASS_WHATS,
    database: process.env.DB_NAME_WHATS,
})

connection.connect((error) => {
    if (error) throw error
    console.log('Database connected')
})

module.exports = connection;