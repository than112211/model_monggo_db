const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seat = Schema({
    id: String,
        seat :[
            [seatA],
            [seatB],
            [seatC]
          ],
     seatAvailable:Number,

});
