const express = require('express')
const app = express()
require('./db')

app.get('/api', (req, res) => {
  res.status(200).send('API works.')
})

const UserController = require('./user/UserController')
app.use('/api/users', UserController)

const AuthController = require('./auth/AuthController')
app.use('/api/auth', AuthController)

module.exports = app
