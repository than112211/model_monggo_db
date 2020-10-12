
const Gift = require('../models/Gift')


class GiftControllers {

     //get /gift/:slug
     show(req,res,next) {
        Gift.findOne({slug :req.params.slug})
        // nhận về colecttion gift theo slug
        .then(gift =>  res.json(gift))
        .catch(next)
    }

    
 // GET /gift/all
    index(req, res,next) {

        Gift.find({},function(err,gift){
            if(!err)  {
                res.json(gift);
            }
            else
            res.json({error:'Không tìm thấy'})
        });
    }


    // tạo gift
    //POST /gift/create      
    create(req,res,next) {
     const gift =new Gift(req.body);
    gift.save()
    .then(() => res.json(req.body))
    .catch(next)
    }


    //PUT /gift/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Gift.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /gift/:id 
     delete(req,res,next) {
        Gift.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new GiftControllers;