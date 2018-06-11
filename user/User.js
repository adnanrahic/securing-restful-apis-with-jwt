var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email:{
        type: String,
        required: 'Please Enter your E-mail address',
        unique: true
    },
  password:{
        type: String,
        required: 'Please Enter your Password' 
    }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
