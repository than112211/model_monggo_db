const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    id:String,
    state: String,
    movie:String,
    total:Number,
    reversation:{
      id :ObjectId,
      seat:[seatnumber],
      price:Number,
      total:Number
    },
    createOn:{type:Date,default: Date.now},
  });




  module.exports= mongoose.model('ticket', Ticket);
