
const News = require('../models/News')


class NewsController {


 

    //get /movie/:slug
    show(req,res,next) {
        Movie.findOne({slug :req.params.slug})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.json(movie))
        .catch(next)
    }
    all(req,res,next) {
        News.find({})
        // nhận về colecttion movie theo slug
        .then(news => res.json(news.splice(0,req.params.number)))
        .catch(next)
    }
    comming(req,res,next) {
        Movie.find({playing : false})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.json(movie.splice(0,6)))
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
   
   
       //PUT /movie/:id 
       // PUT là method để chỉnh sửa
        update(req,res,next) {
            req.body.image=req.file.path
            req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
           Movie.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
           //redirec điều hướng sang
           .then(() => res.json({message:'Đã cập nhập'}))
      
       .catch(next)
        }
   
   //DELETE /movie/:id 
        delete(req,res,next) {
           Movie.deleteOne({_id:req.params.id}) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Đã xóa'})) // back la quay lại trang vừa đứng
      
       .catch(next)
        }
        //UPDATE /movie/:id/dangchieu
        dangchieu(req,res,next){
            req.body.playing=true
            Movie.updateOne({_id:req.params.id} ,req.body) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Phim đang chiếu'}))
           .catch(next)
        }

        //UPDATE /movie/:id/sapchieu
        sapchieu(req,res,next){
            req.body.playing=false
            Movie.updateOne({_id:req.params.id} ,req.body) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Phim sắp chiếu'}))
           .catch(next)
        }

      
   }
   



module.exports = new NewsController;