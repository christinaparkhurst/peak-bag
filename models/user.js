var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Peak     = require('./peak');

var UserSchema = new mongoose.Schema({
  local : {
    firstName: String,
    lastName : String,
    email    : String,
    password : String
  },
  peaks : [Peak.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));    //
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);

// },
// facebook : {
//   email: String,
