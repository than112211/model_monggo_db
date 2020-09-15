const express = require('express');
const path = require('path')
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const db=require('./config/db');
const app = express();
const port = 3000

// connect db
db.connect();

app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('combined'))
//templte engine
//định nghĩa các file  .handlebars có thể sữa lại hbs 
app.engine('handlebars', exphbs({
  extname:'handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname,'resoures/view'))


app.get('/', (req, res) => {
  res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// run code = node + trang can runnod.