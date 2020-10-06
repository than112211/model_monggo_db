 const siteRoute = require('./site');
 const movieRoute = require('./movies');
 const adminRoute = require('./admin');
 const accountRoute = require('./account');
 const eventRoute = require('./event');
 const verifyRoute = require('./verify');









function route(app){
    app.use('/event',eventRoute); // trang sự kiện
    app.use('/verify',verifyRoute); // xác nhận email

    app.use('/admin',adminRoute); // trang edit phim
    app.use('/movie',movieRoute); // trang show  details phim theo slug
    app.use('/account',accountRoute); // trang accout
    app.use('/',siteRoute); // trang chủ showw all phim


      
}
 module.exports = route;