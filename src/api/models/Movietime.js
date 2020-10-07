const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movietime = Schema({
  // SUẤT CHIẾU PHIM
  
  id:Schema.Types.ObjectId,
  // movie,theater = id tham chiếu đến 2 bảng movie và theater
  movie: Schema.Types.ObjectId,
  theater_id:Schema.Types.ObjectId,

  date:{
  date_start:Date,
  date_end:Date
  },
  
  seat:[{
    seat_id: [],
    seat_available:Boolean,
  }]
  });

  module.exports= mongoose.model('movietime', Movietime);
