const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
    id : ObjectId,
    name: String,
    email : String,
    phonenumber : String,
    username : String,
    passwork: String,
  })
  module.exports= mongoose.model('user', User);
