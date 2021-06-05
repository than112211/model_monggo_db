
const News = require('../models/News')


class NewsController {

    all(req,res,next) {
        News.find({})
        // nhận về colecttion movie theo slug
        .then(news => res.json(news.splice(0,req.params.number)))
        .catch(next)
    }
     // tạo phim
    //POST /movie/create      
    create(req,res,next) {
        req.body.image=req.file.path
        const news =new News(req.body);
       news.save()
       .then(() => res.json(req.body))
       .catch(next)
       }
     
   }
   



module.exports = new NewsController;