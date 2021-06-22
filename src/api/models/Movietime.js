const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movietime = Schema({
  // SUẤT CHIẾU PHIM
  
  id:Schema.Types.ObjectId,
  movie_id:Schema.Types.ObjectId,
  theater_id:Schema.Types.ObjectId,
  movietime:{
    date:Date,
    hour:String,
    price:Number,
    seat:[
        [
      {
        id: String,
        available:Boolean,
      }
        ]
      ]
  },
      


  },
  {
    timestamps: true
  });

  module.exports= mongoose.model('movietime', Movietime);
