const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    id:Schema.Types.ObjectId,
    user:Schema.Types.ObjectId,
    theater:String,
    movie:String,
    seat:[String],
    price:Number,
    code_gift:String,
    createOn:{type:Date,default: Date.now}
  });
  module.exports= mongoose.model('ticket', Ticket);
