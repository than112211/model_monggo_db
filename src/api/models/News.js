const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const News= new Schema({
    id : Schema.Types.ObjectId,
    title: String,
    decription: String,
    content:String,
    image: String,
  });
  module.exports= mongoose.model('News', News);
