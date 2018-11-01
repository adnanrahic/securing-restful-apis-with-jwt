require('dotenv')
  .config({
    path: `./config/${process.env.NODE_ENV}.env`
  })

var app = require('./app')
var port = process.env.PORT || 3000
const server = app.listen(port, () => console.log('Express server listening on port ' + port))
module.exports = server
