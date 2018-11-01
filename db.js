const config = require('./config')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.db, { useNewUrlParser: true })
