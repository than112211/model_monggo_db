const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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
    // tạo slug thông qua name 
    slug: { type: String, slug: 'name',unique: true }
  });
  module.exports= mongoose.model('Movie', Movie);
