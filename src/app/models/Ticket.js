const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    
    showtime: Date,
    purchasedAt: Date,
    purchasedBy: { type: ObjectId, ref: 'User' },
    movie: { type: ObjectId, ref: 'Movie' },
    paid : Boolean,
    seat: { type: ObjectId, ref: 'Seat' }
  })
  module.exports= mongoose.model('ticket', Ticket);
