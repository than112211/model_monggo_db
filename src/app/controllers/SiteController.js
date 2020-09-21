const Movie = require('../models/Movie')
class SiteControllers {

    index(req, res) {
        Movie.find({},function(err,movie){
            if(!err)  {
                res.json(movie);
            }
            else
            res.json({error:'loi~~~'});
    
        });
        // res.render('home');
    }
    search(req,res) {
        res.render('search')
    }
}


module.exports = new SiteControllers;