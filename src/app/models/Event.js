const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event= new Schema({
    id:Schema.Types.ObjectId,
    name :String,
    discription:String,
    image: String,
    date:{
        date_start:Date,
        date_end:Date
        },


});
module.exports= mongoose.model('event', Event);
