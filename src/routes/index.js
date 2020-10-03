 const siteRoute = require('./site');
 const movieRoute = require('./movies');
 const adminRoute = require('./admin');
 const accountRoute = require('./account');







function route(app){
    app.use('/admin',adminRoute);
    app.use('/movie',movieRoute);
    app.use('/account',accountRoute);
    app.use('/',siteRoute);


      
}
 module.exports = route;