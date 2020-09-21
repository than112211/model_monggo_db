const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie= new Schema({
    id : Schema.Types.ObjectId,
    name: String,
    decription: String,
    image: String,
    trailer: String,
    director:String,
    actor:String,
    type:String,
    length:Number,
    language:String,
    rating: Number,
  });
  module.exports= mongoose.model('movie', Movie);
