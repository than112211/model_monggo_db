
const Movie = require('../models/Movie')


class MovieControllers {
    //get /movie/:slug
    show(req,res,next) {
        Movie.findOne({slug :req.params.slug})
        .then(movie =>  res.json(movie))
        .catch(next)
    }
    now(req,res,next) {
        Movie.find({playing :true})
        .then(movie =>  res.json(movie.splice(0,6)))
        .catch(next)
    }
    getName(req,res,next) {
    
        Movie.find({})
        .then(movie => {
            const listName = []
            movie.map(movie =>{
                let obj = {
                    name:movie.name,
                    id:movie._id
                }
                listName.push(obj)
            })
            res.json(listName)
        })       
         .catch(next)
    }

    all(req,res,next) {
        const page = req.query.page
        const limit = req.query.limit
        const start = (page -1 ) * limit
        const end = page * limit
        Movie.find({})
        .then(movie => {
            res.json({
                movie:movie.slice(start,end),
                total:movie.length
            })
        })       
         .catch(next)
    }

    playing(req,res,next) {
        const page = req.query.page
        const limit = req.query.limit
        const start = (page -1 ) * limit
        const end = page * limit
        Movie.find({playing :true})
        .then(movie => {
            res.json({
                movie:movie.slice(start,end),
                total:movie.length
            })
        })
        .catch(next)
    }
    soon(req,res,next) {
        const page = req.query.page
        const limit = req.query.limit
        const start = (page -1 ) * limit
        const end = page * limit
        Movie.find({playing :false})
        // nhận về colecttion movie theo slug
        .then(movie => {
            res.json({
                movie:movie.slice(start,end),
                total:movie.length
            })
        })
        .catch(next)
    }
    comming(req,res,next) {
        Movie.find({playing : false})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.json(movie.splice(0,6)))
        .catch(next)
    }


    search(req,res,next) {
        Movie.find({name : {$regex : new RegExp (req.query.name,'i')}})
        .then(movie =>  res.status(200).json(movie))
        .catch(next)
    }


     // tạo phim
    //POST /movie/create      
    create(req,res,next) {
        console.log(req.files)
        Movie.find({name:req.body.name})
        .then(movie => {
            if(movie && movie.length){
            res.status(201).json('Đã tồn tại tên này')

            }
            else {
                req.body.image = req.files.image[0].path
                req.body.trailer = req.files.trailer[0].path
        req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
        const movie =new Movie(req.body);
       movie.save()
       .then(() => res.status(200).json('Tạo thành công'))
       .catch(next)
            }
        })
        .catch(next)
       }
   
   
       //PUT /movie/:id 
       // PUT là method để chỉnh sửa
        update(req,res,next) {
            console.log(req.body)
                if(req.files.image){
                    req.body.image=req.files.image[0].path
                }
                if(req.files.trailer){
                    req.body.trailer=req.files.trailer[0].path
                }
        
            req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
           Movie.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
           //redirec điều hướng sang
           .then(() => res.status(200).json({message:'Đã cập nhập'}))
      
       .catch(next)
        }
   
   //DELETE /movie/:id 
        delete(req,res,next) {
           Movie.findOne({_id:req.params.id})
           .then(movie => {
               if( movie && movie.playing){
                 res.status(201).json({message:'Phim đang chiếu ko thể xóa'})

               }
                else {
                    Movie.deleteOne({_id:req.params.id}) 
           .then(() => res.status(200).json({message:'Đã xóa'}))
                }
           }) // back la quay lại trang vừa đứng
      
       .catch(next)
        }
        numberPlaying(req,res,next) {
            Movie.find({playing:true})
            .then(movie => {
                  res.status(200).json(movie.length)
            }) // back la quay lại trang vừa đứng
       
        .catch(next)
         }

         numberCommingSoon(req,res,next) {
            Movie.find({playing:false})
            .then(movie => {
                  res.status(200).json(movie.length)
            }) // back la quay lại trang vừa đứng
       
        .catch(next)
         }

         numberAll(req,res,next) {
            Movie.find({})
            .then(movie => {
                  res.status(200).json(movie.length)
            }) // back la quay lại trang vừa đứng
       
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
   



module.exports = new MovieControllers;