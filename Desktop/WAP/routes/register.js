const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../public/javascripts/db')

// Register user
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  // validation and database operations

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

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
        [firstName, lastName, email, hashedPassword],
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
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

module.exports = router
