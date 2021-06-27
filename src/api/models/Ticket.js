const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Ticket = Schema({
    id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId,
    movietime_id:Schema.Types.ObjectId,
    number:Number,
    namemovie:String,
    theater:String,
    date:Date,
    hour:String,
    status:{type:Boolean,default:true},
    seat:[     
        String
    ],
    paid:Boolean,
    price:Number,
    gift:String,
},
        {
        timestamps: true
      }

  );
  module.exports= mongoose.model('ticket', Ticket);
