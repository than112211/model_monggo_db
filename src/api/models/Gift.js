const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gift= new Schema({
    id:Schema.Types.ObjectId,
    name :String,
    amount:Number,
    description:String,
    code:[String],
    value : Number,
    available:Number,
    point_to_get:Number,
    date:{
        date_start:Date,
        date_end:Date
    }
},
{
    timestamps: true
  }
);
module.exports= mongoose.model('gift', Gift);
