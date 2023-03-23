const express = require('express')
const router = express.Router()
const db = require('../public/javascripts/db')

// Register user
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body
  // validation and database operations

  db.getConnection((err, connection) => {
    // handle connection errors
    if (err) {
      console.error(err)
      return
    }
    // perform database operations
    let sql =
      'INSERT INTO User (firstName, lastName, email, password) VALUES (?, ?, ?, ?)'
    connection.query(
      sql,
      [firstName, lastName, email, password],
      (err, result) => {
        if (err) {
          console.error(err)
        }
        console.log('1 record inserted')
        // close connection when done
        connection.release()
        // close connection pool
        // db.closePool()
      }
    )
  })

  res.send('User registered successfully')
})

module.exports = router
