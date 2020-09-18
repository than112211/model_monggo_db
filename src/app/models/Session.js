const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Theater = Schema({
  // suất chiếu
    id : ObjectId, 
    theaterID: String,
    name : String, //phim chiếu
    description : String,
    start :{type:Date,default: Date.now},
    end :{type:Date,default: Date.now},
    price : Number,
    seatAvailable:Number,
    seat : [seatNumber],

    reversation:{ // các đơn hàng đã chọn chổ
      id :ObjectId,
      seat:[
        [numberseat]
      ],
      price:Number,
      total:Number
    }

  })
  module.exports= mongoose.model('session', Session);
