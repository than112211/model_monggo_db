 const homeRoute = require('./home');
 const movieRoute = require('./movies');
 const accountRoute = require('./account');
 const eventRoute = require('./event');










function route(app){
    app.use('/event',eventRoute); // trang sự kiện
    app.use('/movie',movieRoute); // trang movie
    app.use('/account',accountRoute); // trang accout

    app.use('/',homeRoute); // trang chủ showw all phim


      
}
 module.exports = route;