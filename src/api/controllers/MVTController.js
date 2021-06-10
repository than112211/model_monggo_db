
const Movietime = require('../models/Movietime')


class MovietimeControllers {

     //get /Movietime/:idmovie
     // lấy tất cả movietime theo id movie
     show(req,res,next) {
        Movietime.find({movie_id:req.params.id},function(err,movietime){
            if(!err)  {
                res.json(movietime);
            }
            else
            res.json({message:'Không tìm thấy'})
        })  
    }
    date(req,res,next) {
        Movietime.find({movie_id:req.params.id,theater_id:req.params.theater})
        .then(movietime => {
                if(movietime && movietime.length){
                    const listDate = []
                    for(let i = 0 ; i < movietime.length ; i++) {
                        let date = new Date(movietime[i].movietime.date)
                        date.setDate(date.getDate()+1)
                        listDate.push(date)
                        if(listDate.length === movietime.length){
                            res.json(listDate)
                        }

                    }
                }
                else res.json(movietime)
        })
    }

    hour(req,res,next) {
        Movietime.find({movie_id:req.params.id,theater_id:req.params.theater,"movietime.date": new Date(req.params.date.split('T').splice(0,1).toString().replace(/-/g,'/'))})
        .then(movietime => {
            if(movietime && movietime.length){
                const listHour = []
                for(let i = 0 ; i < movietime.length ; i++) {
                    let date = movietime[i].movietime.hour
                    listHour.push(date)
                    if(listHour.length === movietime.length){
                        res.json(listHour)
                    }

                }
            }
            else res.json(movietime)
        })
    }
    getMovietime(req,res,next) {
        console.log('da vao day')
        Movietime.findOne({movie_id:req.params.id,
            theater_id:req.params.theater,
            "movietime.date": new Date(req.params.date.split('T').splice(0,1).toString().replace(/-/g,'/')),
            "movietime.hour":req.params.hour
        })
        .then(movietime => {
           res.json(movietime)
        })
    }

    // tạo Movietime
    //POST /Movietime/:id movie/create      
    create(req,res,next) {     
    var colume = ['A','B','C','D','E','F','G','H','I','J']
    var seat=[]
       for(var i = 0;i<colume.length;i++){
        seat[i]=[]
           for( var j=0;j<12;j++){
            seat[i][j]={id:colume[i]+(j+1),available:true}
           }
       }
    req.body.movietime={date:req.body.date,
                        hour:req.body.hour,
                        price:req.body.price,
                        seat:seat
                    }
    req.body.movie_id=req.params.id
    req.body.theater_id=req.params.theater
        const movietime =new Movietime(req.body); 
            movietime.save()
    .then(() => res.json(movietime))
    .catch(next)
    }


    //PUT /Movietime/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Movietime.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /Movietime/:id 
     delete(req,res,next) {
        Movietime.deleteOne({_id:req.params.id}) 
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new MovietimeControllers;