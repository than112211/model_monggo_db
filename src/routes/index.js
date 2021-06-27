 const movieRoute = require('./movies');
 const accountRoute = require('./account');
 const eventRoute = require('./event');
 const giftRoute = require('./gift');
 const theaterRoute = require('./theater');
 const movietimeRoute = require('./movietime');
 const ticketRoute = require('./ticket');
 const newsRoute = require('./news')

function route(app){
    app.use('/event',eventRoute); // trang sự kiện
    app.use('/movie',movieRoute); // trang movie
    app.use('/account',accountRoute); // trang accout
    app.use('/movietime',movietimeRoute); // trang suất chiếu phim
    app.use('/ticket',ticketRoute); // trang vé
    app.use('/news',newsRoute); // trang tin tức
    app.use('/gift',giftRoute); // trang code gift
    app.use('/theater',theaterRoute); // trang theater
  
}
 module.exports = route;