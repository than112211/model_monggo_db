const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class AuthControllers{

    register(req,res,next){
        bcrypt.hash(req.body.passwork,10,function(err,hashedPass){
            if(err){
                res.json({message:'lỗi'})
            }
            const formData = req.body
            formData.passwork = hashedPass
            const user = new User(formData)
            user.save()
            .then(() => res.json({message:'đăng kí thành công'}))
            .catch(next)          
        })
    }
    login(req,res,next){
        var username= req.body.username
        var passwork= req.body.passwork
        User.findOne({username:username})
        .then(user =>{
            if(user){
                bcrypt.compare(passwork,user.passwork,function(err,result){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                        var token = jwt.sign({name : user.name},'veryserect',{expiresIn:'1h'})
                        res.json({message:'login succes',token})
                        
                        
                     
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