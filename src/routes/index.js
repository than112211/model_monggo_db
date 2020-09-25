 const newsRoute = require('./news');
 const siteRoute = require('./site');
 const movieRoute = require('./movies');





function route(app){
    app.use('/movie',movieRoute);
    app.use('/news',newsRoute);
    app.use('/',siteRoute);


      
}
 module.exports = route;