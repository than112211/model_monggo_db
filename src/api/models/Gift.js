const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gift= new Schema({
    id:Schema.Types.ObjectId,
    name :String,
    code:[{
        id:String,
        available:Boolean
    }],
    value : Number,
    available:Number,


});
module.exports= mongoose.model('gift', Gift);
