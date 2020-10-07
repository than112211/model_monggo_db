const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGIRD_KEY)

class AuthControllers{

    register(req,res,next){
        // check email is registed
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
    res.json({message:'email đã đc sử dụng đăng kí cho tk khác'})
                }
            else{
      

        bcrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.json({message:'ko mã hóa đc mk'})
            }
            const formData = req.body
            formData.password = hashedPass
            formData.isVerified = false
            formData.token= jwt.sign({name :req.body.name},'veryserect',{expiresIn:'1h'})                         
            const user = new User(formData)
            user.save()
            // gữi email
            const msg = {
                to: user.email, // Change to your recipient
                from: 'than123456qwe@gmail.com', // Change to your verified sender
                subject: 'Xác minh tài khoản Le Do Cinema',
                text: 'Bạn muốn xác nhận tài khoản Le Do Cinema.',
                html: `<a href="http://${req.headers.host}/account/verify?token=${user.token}">Vui lòng kích vào đây để xác nhận</a>`,
              }
            sgMail.send(msg)
            .then(() => res.json({message:'đăng kí thành công'}))
            .catch(next)          
        })
    }})
    }
    login(req,res,next){

        
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                bcrypt.compare(req.body.password,user.password,function(err,result){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                       var token = jwt.sign({name : user.name},'veryserect',{expiresIn:'1h'})                         
                        res.json({message:'login succes',token})
                      
                        user.token=token
                        user.save()
                                  
                    }
                    else  res.json({message:'Mật khẩu sai'})
                })
        

            }
            else  res.json({message:'Không tìm thấy'})
        })
        .catch(next)

    }
    index(req,res,next){
       User.findOne({token:req.query.token})
      .then(user => {
                     if(user.isVerified==false){
                     user.isVerified=true,
                     user.save(),
                    res.json({message:'xác nhận thành công'})}
                    else {res.json({message:'tài khoản đã đc xác nhận trưóc đó'})}
      }
                )
   
        .catch(next)
       

    }
    //PUT /account/:token
       // PUT là method để chỉnh sửa
       update(req,res,next) {
        bcrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.json({message:'ko mã hóa đc mk'})
            }
            const formData = req.body
            formData.password = hashedPass
        Movie.updateOne({token:req.params.token} ,formData) // điều kiện , reqbody là các bản ghi để sữa
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     })
    }
}
module.exports = new AuthControllers;