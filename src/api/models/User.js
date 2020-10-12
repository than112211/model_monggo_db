const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('validator');

const User = Schema({
    id : Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
          if (!validator.isEmail(value)) {
              throw new Error({error: 'Invalid Email address'})
          }
      }
  },
  password: {
      type: String,
      required: true,
      minLength: 6
  },
  token: [String],
  
  isVerified:Boolean,
  })
  module.exports= mongoose.model('user', User);
