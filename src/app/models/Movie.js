const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie= new Schema({
    id : ObjectId,
    name: {type:String,minlength:1},
    decription: {type:String,minlength:1},
    image: {type:Image},
    showtime: {
      date: Date,
      price: Number},
    // thời gian tạo bản ghi và tg cập nhật bản ghi
    createAt:{type:Date,default: Date.now},
    updateAt:{type:Date,default: Date.now}
  });
  module.exports= mongoose.model('movie', Movie);
