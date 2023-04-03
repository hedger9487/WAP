const express = require('express')
const router = express.Router()
const registerRouter = require('./register')
const loginRouter = require('./login')
const infoRouter = require('./info')
const transactionRouter = require('./transaction')
const transactionListRouter = require('./transactionlist')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/info', infoRouter)
router.use('/transaction', transactionRouter)
router.use('/transactionlist', transactionListRouter)
// Other user routes

module.exports = router
