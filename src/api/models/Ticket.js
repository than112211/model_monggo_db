const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId,
    movietime_id:Schema.Types.ObjectId,
    theater_id:Schema.Types.ObjectId,
    namemovie:String,
    theater:String,
    seat:[
      
        String
      
      
    ],
    total_price:Number,
    code_gift:String,
    createOn:{type:Date,default: Date.now}

  });
  module.exports= mongoose.model('ticket', Ticket);
