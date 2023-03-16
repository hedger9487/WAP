const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
/*
const connection = mysql.createConnection({
  host: 'your_database_host',
  port: 'your_database_port',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
})

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting to database:', err.stack)
    return
  }

  console.log('Connected to database.')
})

connection.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error

  console.log('User data:', results)
})
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*
connection.end(function (err) {
  if (err) {
    console.error('Error closing database connection:', err.stack)
    return
  }

  console.log('Database connection closed.')
})
*/
