
const Gift = require('../models/Gift')
const GiftOder = require('../models/GiftOder')
const voucher_codes = require('voucher-code-generator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class GiftControllers {

     //get /gift/:id
     show(req,res,next) {
        Gift.findOne({_id:req.params.id})
        .then(gift =>  res.json(gift))
        .catch(next)
    }

    
 // GET /gift/all
    index(req, res,next) {

        const page = req.query.page
        const limit = req.query.limit
        const start = (page - 1 ) * limit
        const end = page * limit
        Gift.find({})
        .then(gift => {
            res.json({
                gift:gift.slice(start,end),
                total:gift.length
            })
        })
        .catch(next)
    }


    // tạo gift
    //POST /gift/create      
    create(req,res,next) {
        Gift.find({name:req.body.name})
        .then(gift => {
            if( gift && gift.length){
                res.status(201).json('Tên đã tồn tại')
            }
            else {
                req.body.code =voucher_codes.generate({
                    length:10,
                    count:req.body.amount
                })
                req.body.available =req.body.code.length
                req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
           
                const gift =new Gift(req.body);
                
               gift.save()
               .then(() => res.status(200).json('Tạo thành công'))
               .catch(next)
               }
            
        })
        .catch(next)
    }
    //POST /gift/:id/get
    get(req,res,next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user =>{       
            Gift.findOne({_id:req.params.id})
            .then(gift =>{

                if(gift.code.length >0 ){
                    if(user.point>=gift.point_to_get){
                        var n={code:gift.code[0],
                                value:gift.value,
                                name:gift.name,
                                description:gift.description
                            }
                        var newOder ={
                            gift_code:{
                                code:gift.code[0],
                                value:gift.value,
                            },
                            id_user:user._id,
                            id_gift:gift._id,
                        }
                            user.gift_code.push(n) // thêm code và value vào user
                            user.point=user.point - gift.point_to_get
                            user.save()
                            gift.code.shift() // xóa đầu mảng
                            gift.available=gift.available-1
                            gift.save()
                            const newOD = new GiftOder(newOder)
                            newOD.save()
                            res.status(200).json({message:'Đổi thành công'})
                            
                    }
                    else res.status(201).json({message:'Không đủ điểm để đổi'})
                }
                else res.status(202).json({message:'Đã hết mã quà tặng'})
            })
            .catch(next)
        })
        .catch(next)

    }


    //PUT /gift/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        req.body.date={date_start:req.body.date_start[0],date_end:req.body.date_end[0]}
        Gift.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.status(200).json({message:'Đã cập nhập'}))
        .catch(next)
     }

//DELETE /gift/:id 
     delete(req,res,next) {
        Gift.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.status(200).json({message:'Đã xóa'})) 
   
    .catch(next)
     }

     getAllWeek(req,res,next) {
        let d = new Date();
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); 
        const date = new Date(d.setDate(diff));
        GiftOder.find({createdAt:{
            $gte:date.toDateString()
        }})
        .then(gift => {
            
            res.json({number:gift.length,total:gift.reduce(((accumulator, currentValue) => accumulator + currentValue.gift_code.value),0)})
        })
        .catch(next)
    }
    getAllMonth(req,res,next) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
         GiftOder.find({createdAt:{
            $gte:firstDay
        }})
        .then(gift => {
            res.json({number:gift.length,total:gift.reduce(((accumulator, currentValue) => accumulator + currentValue.gift_code.value),0)})
        })
        .catch(next)
    }
    getAllYear(req,res,next) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), 0 , 1);
        GiftOder.find({createdAt:{
            $gte:firstDay
        }})
        .then(gift => {
            res.json({number:gift.length,total:gift.reduce(((accumulator, currentValue) => accumulator + currentValue.gift_code.value),0)})
        })
        .catch(next)
    }
    

}


module.exports = new GiftControllers;