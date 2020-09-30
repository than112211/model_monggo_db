
const Movie = require('../models/Movie')
const { mongooseToOject } = require ('../../util/mongoose')
const { multipleMongooseToOject } = require ('../../util/mongoose')

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

    //get /movie/:slug
    show(req,res,next) {
        Movie.findOne({slug : req.params.slug})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.render('movie/show' ,{movieslug :mongooseToOject(movie)}))
        .catch(next)
    }
    //POST /movie/create
    create(req,res,next) {
       res.render('movie/create')
    }
    //POST /movie/store
    store(req,res,next) {
     const movie =new Movie(req.body);
    movie.save()
    .then(() => res.redirect('/'))
    .catch(error =>{
    })
    }
//get /movie/stored

    stored(req,res,next) {
        Movie.find({})
        .then(movie =>  res.render('movie/stored' ,{moviestore :multipleMongooseToOject(movie)}))
       .catch(next)
     }

//get /movie/:id/edit

     edit(req,res,next) {
        Movie.findById(req.params.id)
        .then(movie =>  res.render('movie/edit' ,{movieedit :mongooseToOject(movie)}))
       .catch(next)
     }

    //PUT /movie/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Movie.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        //redirec điều hướng sang
        .then(() => res.redirect('/movie/stored'))
   
    .catch(next)
     }

//DELETE /movie/:id 
     delete(req,res,next) {
        Movie.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.redirect('back')) // back la quay lại trang vừa đứng
   
    .catch(next)
     }
}


module.exports = new MovieControllers;