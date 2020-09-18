const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie= new Schema({
    id : ObjectId,
    name: String,
    decription: String,
    image: Image,
    showtime: {
      start: Date,
      end:Date},
    

  });
  module.exports= mongoose.model('movie', Movie);
