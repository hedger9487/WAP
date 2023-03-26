const express = require('express')
const router = express.Router()
const db = require('../public/javascripts/db')
const session = require('./session')
const auth = require('./auth')

// Configure session middleware
session.configureSession(router)

// Get user info
router.get('/', auth.authenticate, async (req, res) => {
  const userId = req.userId
  db.getConnection(async (err, connection) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }

    let sql = 'SELECT * FROM User WHERE userId = ?'

    await connection.query(sql, [userId], (err, results, fields) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
      }

      if (results.length > 0) {
        const user = results[0]
        // Exclude password field from response
        delete user.password
        res.json(user)
      } else {
        console.log('No rows found')
        return res.status(404).json({ message: 'User not found' })
      }
    })

    // close connection when done
    connection.release()
  })
})

module.exports = router
