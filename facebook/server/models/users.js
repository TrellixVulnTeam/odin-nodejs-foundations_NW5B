const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  profile_photo: String,
  password: String,
  facebookID: String,
  displayName: String,
  first_name: String,
  last_name: String,
}, {timestamps: true});

UserSchema.virtual('full_name').get(function() {
  return this.first_name + ' ' + this.last_name;
})

UserSchema.methods.generate_jwt = function() {
  jwt.sign({user: this}, process.env.JWT_SECRET, (err, token) => {
    if(err) return err;
    console.log('in schema method ', token)
    return token;
  })
}

module.exports = mongoose.model('User', UserSchema);