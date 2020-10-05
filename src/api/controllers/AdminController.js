
const Movie = require('../models/Movie')


class AdminControllers {
    

    

    // tạo phim
    //POST /movie/create      
    create(req,res,next) {
     const movie =new Movie(req.body);
    movie.save()
    .then(() => res.json(req.body))
    .catch(next)
    }


    //PUT /admin/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Movie.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /admin/:id 
     delete(req,res,next) {
        Movie.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã xóa'})) // back la quay lại trang vừa đứng
   
    .catch(next)
     }
}


module.exports = new AdminControllers;