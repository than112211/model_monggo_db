const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Seat = Schema({
    id : ObjectId, 
    seat : [String][Number]
  })
  module.exports= mongoose.model('seat', Seat);
