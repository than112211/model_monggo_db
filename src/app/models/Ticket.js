const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    id:Schema.Types.ObjectId,
    user:Schema.Types.ObjectId,
    theater:String,
    movie:String,
    seat:[String],
    price:Number,
    createOn:{type:Date,default: Date.now}
  });
  module.exports= mongoose.model('ticket', Ticket);
