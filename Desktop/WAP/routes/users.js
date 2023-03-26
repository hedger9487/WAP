const express = require('express')
const router = express.Router()
const registerRouter = require('./register')
const loginRouter = require('./login')
const infoRouter = require('./info')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/info', infoRouter)
// Other user routes

module.exports = router
