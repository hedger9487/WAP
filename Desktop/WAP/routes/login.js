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
    const rows = await connection.query(sql, [email])
    if (rows && rows.length > 0) {
      console.log(rows[0].firstName)
      console.log(rows[0].lastName)
      console.log(rows[0].password)
      console.log(rows[0].userId)
    } else {
      console.log('No rows found')
    }
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(password, rows[0].password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    // Create session and store user data
    const user = {
      userId: rows[0].userId,
      lastName: rows[0].lastName,
      firstName: rows[0].firstName,
      email: rows[0].email,
    }
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

    // close connection when done
    connection.release()
    // close connection pool
    db.closePool()
  })
})

module.exports = router
