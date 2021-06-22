const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftOder = new Schema({
    id:Schema.Types.ObjectId,
    id_user :Schema.Types.ObjectId,
    id_gift:Schema.Types.ObjectId,
    gift_code:{
        code:String,
        value:Number
    },
},
{
    timestamps: true
  }
);
module.exports= mongoose.model('giftoder', GiftOder);
