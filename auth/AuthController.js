var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require(__root + 'config'); // get config file
var User = require(__root + 'user/User');

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    if (user.password != req.body.password) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is right
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {

    // return auth false including token as null
    res.status(200).send({ auth: false, token: null });

});

router.post('/register', function(req, res) {

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem adding the information to the database.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: false, token: null });
  });

});

router.get('/me', function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    /**
     * SHOW THAT DECODED IS AN OBJECT WITH A _doc PROPERTY
     */

    // if everything is good, send back the decoded token
    res.status(200).send(decoded);
  });

});



module.exports = router;