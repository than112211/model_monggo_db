
const Movie = require('../models/Movie')
const { multipleMongooseToOject } = require ('../../util/mongoose')
class SiteControllers {

    index(req, res,next) {
        // Movie.find({},function(err,movie){
        //     if(!err)  {
        //         res.json(movie);
        //     }
        //     else
        //     res.json({error:'loi~~~'});
    
        // });
        // // res.render('home');

        // then là khi thành công , cathch là khi lỗi
        // nhận key là movie và dữ liệu là object ( scheme) movie
        Movie.find({}).then(movie => res.render('home',{ movietest : multipleMongooseToOject(movie)} ))
                    .catch( next); 
    }
    search(req,res) {
        res.render('search')
    }
}


module.exports = new SiteControllers;