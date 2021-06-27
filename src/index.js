const express = require('express');
const path = require('path')
const morgan = require('morgan');
const db=require('./config/db');
const app = express();
const port = process.env.PORT || 8080
const route = require('./routes')

var cors = require('cors')
require('dotenv').config()
db.connect();
app.use(cors())
app.use('/src/resoures',express.static(path.join(__dirname,'resoures')))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

app.use(morgan('combined'))

route(app); // khởi tạo route

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
