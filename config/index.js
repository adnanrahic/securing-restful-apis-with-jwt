module.exports = {
  'secret': process.env.SECRET || 'supersecret',
  'db': process.env.DB || 'mongodb://127.0.0.1:27017/securing-rest-apis-with-jwt-LOCAL'
}
