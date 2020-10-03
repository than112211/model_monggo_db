
const Movie = require('../models/Movie')


class MovieControllers {


    //get /movie/:slug
    show(req,res,next) {
        Movie.findOne({slug :req.params.slug})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.json(movie))
        .catch(next)
    }
}


module.exports = new MovieControllers;