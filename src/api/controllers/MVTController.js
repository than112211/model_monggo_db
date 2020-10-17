
const Movietime = require('../models/Movietime')


class MovietimeControllers {

     //get /Movietime/:idmovie
     show(req,res,next) {
        Movietime.findOne({movie_id:req.params.id})
        // nhận về colecttion Movietime theo slug
        .then(movietime =>  res.json(movietime))
        .catch(next)
    }

    // tạo Movietime
    //POST /Movietime/create      
    create(req,res,next) {    
     var seat= [
        [{id :'A1', available:false},{id :'A2', available:false},{id :'A3', available:false},{id :'A4', available:false},{id :'A5', available:false},{id :'A6', available:false},{id :'A7', available:false},{id :'A8', available:false},{id :'A9', available:false},{id :'A10', available:false},{id :'A11', available:false},{id :'A12', available:false}],
        [{id :'B1', available:false},{id :'B2', available:false},{id :'B3', available:false},{id :'B4', available:false},{id :'B5', available:false},{id :'B6', available:false},{id :'B7', available:false},{id :'B8', available:false},{id :'B9', available:false},{id :'B10', available:false},{id :'B11', available:false},{id :'B12', available:false}],
        [{id :'C1', available:false},{id :'C2', available:false},{id :'C3', available:false},{id :'C4', available:false},{id :'C5', available:false},{id :'C6', available:false},{id :'C7', available:false},{id :'C8', available:false},{id :'C9', available:false},{id :'C10', available:false},{id :'C11', available:false},{id :'C12', available:false}],
        [{id :'D1', available:false},{id :'D2', available:false},{id :'D3', available:false},{id :'D4', available:false},{id :'D5', available:false},{id :'D6', available:false},{id :'D7', available:false},{id :'D8', available:false},{id :'D9', available:false},{id :'D10', available:false},{id :'D11', available:false},{id :'D12', available:false}],
        [{id :'E1', available:false},{id :'E2', available:false},{id :'E3', available:false},{id :'E4', available:false},{id :'E5', available:false},{id :'E6', available:false},{id :'E7', available:false},{id :'E8', available:false},{id :'E9', available:false},{id :'E10', available:false},{id :'E11', available:false},{id :'E12', available:false}],
        [{id :'F1', available:false},{id :'F2', available:false},{id :'F3', available:false},{id :'F4', available:false},{id :'F5', available:false},{id :'F6', available:false},{id :'F7', available:false},{id :'F8', available:false},{id :'F9', available:false},{id :'F10', available:false},{id :'F11', available:false},{id :'F12', available:false}],
        [{id :'G1', available:false},{id :'G2', available:false},{id :'G3', available:false},{id :'G4', available:false},{id :'G5', available:false},{id :'G6', available:false},{id :'G7', available:false},{id :'G8', available:false},{id :'G9', available:false},{id :'G10', available:false},{id :'G11', available:false},{id :'G12', available:false}],
        [{id :'H1', available:false},{id :'H2', available:false},{id :'H3', available:false},{id :'H4', available:false},{id :'H5', available:false},{id :'H6', available:false},{id :'H7', available:false},{id :'H8', available:false},{id :'H9', available:false},{id :'H10', available:false},{id :'H11', available:false},{id :'H12', available:false}],
        [{id :'I1', available:false},{id :'I2', available:false},{id :'I3', available:false},{id :'I4', available:false},{id :'I5', available:false},{id :'I6', available:false},{id :'I7', available:false},{id :'I8', available:false},{id :'I9', available:false},{id :'I10', available:false},{id :'I11', available:false},{id :'I12', available:false}],
        [{id :'J1', available:false},{id :'J2', available:false},{id :'J3', available:false},{id :'J4', available:false},{id :'J5', available:false},{id :'J6', available:false},{id :'J7', available:false},{id :'J8', available:false},{id :'J9', available:false},{id :'J10', available:false},{id :'J11', available:false},{id :'J12', available:false}] ];       
       for(var i=0;i<req.body.movietime.times.length;i++){
        req.body.movietime.times[i].seat=seat
       }
        const movietime =new Movietime(req.body); 
            movietime.save()
    .then(() => res.json(req.body))
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