const app = require('../app')
const mongoose = require('mongoose')
const async = require('async')

function getApp () {
  return app
}
function clearDB (done) {
  async.each(mongoose.models, function (model, next) {
    model.deleteMany(next)
  }, done)
}
function getModel (model) {
  return mongoose.model(model)
}
function parseJSON (obj) {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = {
  getApp,
  clearDB,
  getModel,
  parseJSON
}
