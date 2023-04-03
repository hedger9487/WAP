const express = require('express')
const router = express.Router()
const db = require('../public/javascripts/db')
const session = require('./session')
const auth = require('./auth')

// Configure session middleware
session.configureSession(router)

router.post('/', auth.authenticate, async (req, res) => {
  const userId = req.userId
  let { amount, description, payees, payers } = req.body
  // Check if payees and payers exist
  let hasPayees = Array.isArray(payees) && payees.length > 0
  let hasPayers = Array.isArray(payers) && payers.length > 0
  // if no payers, user itself is a payer

  // Set status based on payees and payers
  const status = hasPayees || hasPayers ? 'pending' : 'completed'
  if (!hasPayers) {
    hasPayers = true
    payers = [{ userId, payAmount: amount }]
  }
  db.getConnection(async (err, connection) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
    let sql =
      'INSERT INTO Transactions (amount, description, status) VALUES (?, ?, ?)'
    connection.query(sql, [amount, description, status], (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
      }
      const lastInsertId = result.insertId
      console.log('1 transaction recorded')

      if (hasPayers) {
        const payerSql =
          'INSERT INTO TransactionPayer (userId, transactionId, amount, confirm) VALUES (?, ?, ?, ?)'
        for (const payer of payers) {
          const { userId, payAmount } = payer
          const payerInsertParams = [userId, lastInsertId, payAmount, false]
          connection.query(payerSql, payerInsertParams, (err, result) => {
            if (err) {
              console.error(err)
              return res.status(500).json({ message: 'Server error' })
            }
            console.log('1 payer recorded')
          })
        }
      }
      if (hasPayees) {
        const payeeSql =
          'INSERT INTO TransactionPayee (userId, transactionId, amount, confirm) VALUES (?, ?, ?, ?)'
        for (const payee of payees) {
          const { userId, payAmount } = payee
          const payeeInsertParams = [userId, lastInsertId, payAmount, false]
          connection.query(payeeSql, payeeInsertParams, (err, result) => {
            if (err) {
              console.error(err)
              return res.status(500).json({ message: 'Server error' })
            }
            console.log('1 payee recorded')
          })
        }
      }
    })

    connection.release()
  })
})

module.exports = router
