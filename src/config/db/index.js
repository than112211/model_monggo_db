const mongoose = require('mongoose');
const URI ="mongodb+srv://admin:admin@cluster0.crree.mongodb.net/ledocinema?retryWrites=true&w=majority";
async function connect(){

    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
           
        });
        console.log('thanh cong')
        
    } catch (error) {
        console.log('that bai')
    }

}

module.exports={connect};