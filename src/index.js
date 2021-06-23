const express = require('express');
const path = require('path')
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
var methodOverride = require('method-override')
const db=require('./config/db');
const { query } = require('express');
const app = express();
const port = 8080
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
// để sử dụng method PUT
app.use(methodOverride('_method'))



app.use(morgan('combined'))

route(app); // khởi tạo route

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
