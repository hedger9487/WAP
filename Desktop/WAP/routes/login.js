const express = require('express')
const router = express.Router()
const db = require('../public/javascripts/db')
const bcrypt = require('bcrypt')
const session = require('./session')

router.use(express.json())

// Configure session middleware
session.configureSession(router)

// Login endpoint
router.post('/', async (req, res) => {
  const { email, password } = req.body
  db.getConnection(async (err, connection) => {
    // handle connection errors
    if (err) {
      console.error(err)
      return
    }
    // perform database operations
    let sql = 'SELECT * FROM User WHERE email = ?'

    await connection.query(sql, [email], (err, results, fields) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
      }
      const user = results[0]
      if (results.length > 0) {
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
          return res.status(401).json({ message: 'Invalid email or password' })
        }
        // Create session and store user data
        req.session.user = user

        // Create JWT token
        const token = session.createToken(user.userId)

        // Set JWT token in cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: false, // set to true if using HTTPS
          maxAge: 60 * 60 * 1000, // cookie duration in milliseconds
        })
        res.send('Logged in successfully')
      } else {
        console.log('No rows found')
        return res.status(401).json({ message: 'Invalid email or password' })
      }
    })

    // close connection when done
    connection.release()
    // close connection pool
    //db.closePool()
  })
})

module.exports = router
