const session = require('express-session')
const jwt = require('jsonwebtoken')

function configureSession(app) {
  // Set up session middleware
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // set to true if using HTTPS
        maxAge: 60 * 60 * 1000, // session duration in milliseconds
      },
    })
  )

  // Set up middleware to add the JWT token to requests
  app.use((req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
          // Ignore token errors
          console.error(err)
        } else {
          req.userId = decoded.userId
        }
      })
    }
    next()
  })
}

function createToken(userId) {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' })
}

module.exports = {
  configureSession,
  createToken,
}
