const express = require('express')
const router = express.Router()
const db = require('../public/javascripts/db')
const session = require('./session')
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        console.error(err)
        return res.status(401).json({ message: 'Invalid token' })
      } else {
        req.userId = decoded.userId
        next()
      }
    })
  } else {
    return res.status(401).json({ message: 'Authentication required' })
  }
}

module.exports = {
  authenticate,
}
