const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

class AuthControllers{

    register(req,res,next){

        bcrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.json({message:'lỗi'})
            }
            const formData = req.body
            formData.password = hashedPass
            const user = new User(formData)
            user.save()
            // const msg = {
            //     to: user.email, // Change to your recipient
            //     from: 'than123456qwe@gmail.com', // Change to your verified sender
            //     subject: 'Sending with SendGrid is Fun',
            //     text: 'and easy to do anywhere, even with Node.js',
            //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            //   }
            //   sgMail
            // .send(msg)
            .then(() => res.json({message:'đăng kí thành công'}))
            .catch(next)          
        })
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
                      
                        User.updateOne({user},{token:token}) 
                                  
                    }
                    else  res.json({message:'Mật khẩu sai'})
                })
        

            }
            else  res.json({message:'Không tìm thấy'})
        })
        .catch(next)

    }
}
module.exports = new AuthControllers;