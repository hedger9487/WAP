const express = require('express')
const router = express.Router()
const registerRouter = require('./register')
const loginRouter = require('./login')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
// Other user routes

module.exports = router
