
const Movie = require('../models/Movie')
const { mongooseToOject } = require ('../../util/mongoose')
class MovieControllers {

    // index(req, res,next) {
    //     // Movie.find({},function(err,movie){
    //     //     if(!err)  {
    //     //         res.json(movie);
    //     //     }
    //     //     else
    //     //     res.json({error:'loi~~~'});
    
    //     // });
    //     // // res.render('home');

    //     // then là khi thành công , cathch là khi lỗi
    //     // nhận key là movie và dữ liệu là object ( scheme) movie
    //     Movie.find({}).then(movie => res.render('home',{ movietest : multipleMongooseToOject(movie)} ))
    //                 .catch( next); 
    // }

    //get /movie/slug
    show(req,res,next) {
        Movie.findOne({slug : req.params.slug})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.render('movie/show' ,{movieslug :mongooseToOject(movie)}))
        .catch(next)
    }
}


module.exports = new MovieControllers;