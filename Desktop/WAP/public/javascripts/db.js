// db.js
const mysql = require('mysql')

// create connection pool
const pool = mysql.createPool({
  host: '34.81.191.32',
  port: '3306',
  user: 'root',
  password: '020220',
  database: 'hedgerfirstbang',
})

// function to get a connection from the pool
function getConnection(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err)
    }
    callback(null, connection)
  })
}

// function to close the connection pool
function closePool() {
  pool.end((err) => {
    if (err) {
      console.log(err.message)
    }
    console.log('Database connection pool closed.')
  })
}

module.exports.getConnection = getConnection
module.exports.closePool = closePool
