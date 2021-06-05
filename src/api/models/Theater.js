const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Theater = Schema({
    id:Schema.Types.ObjectId,
    name:String
});
module.exports= mongoose.model('theater', Theater);
