/* global __root */
const path = require('path')
const express = require('express')
const app = express()
require('./db')
global.__root = path.join(__dirname)

app.get('/api', (req, res) => {
  res.status(200).send('API works.')
})

const UserController = require(__root + 'user/UserController')
app.use('/api/users', UserController)

const AuthController = require(__root + 'auth/AuthController')
app.use('/api/auth', AuthController)

module.exports = app
