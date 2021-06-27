const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const shortid = require('shortid');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGIRD_KEY)

class AuthControllers{
        
// POST account/register
    register(req,res,next){
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
        res.status(201).json({message:'Email đã tồn tại'})
                }
            else{
        bcrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.json({message:'ko mã hóa đc mk'})
            }
            const formData = req.body
            formData.point=0
            formData.avartar='src/resoures/defaulavartar.png'
            formData.password = hashedPass
            formData.isVerified = false
            const token= jwt.sign({email :req.body.email},process.env.JWT_KEY,{expiresIn:'1h'})   
            formData.token = token                      
            const user = new User(formData)
            user.save()
            const msg = {
                
                to: user.email, // Change to your recipient
                from: 'thannguyenle77@gmail.com', // Change to your verified sender
                subject: 'Xác minh tài khoản CineStar Cinema',      
                html: `<h4>Xin chào ${req.body.name},</h4>
                <p>Chúc mừng bạn trở thành thành viên CineStar Cinema - Tích điểm ngay nhận quà liền tay.
                Bạn có thể đăng nhập dễ dàng vào tài khoản Galaxy để cập nhập các chương trình ưu đãi đặc biệt dành riêng cho bạn </p>`,
              }
            sgMail.send(msg)
            .then(() => res.status(200).json({message:'Đăng kí thành công',user:user,token:token}))
            .catch(next)          
        })
    }})
    }

// POST account/login
    login(req,res,next){
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                bcrypt.compare(req.body.password,user.password,function(err,result){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                       const token = jwt.sign({email: user.email},process.env.JWT_KEY,{expiresIn:'1h'})                         
                        user.token=user.token.concat(token)
                        user.save()
                        res.status(200).json({message:'Đăng nhập thành công',user:user,token:token})          
                    }
                    else  res.status(201).json({message:'Mật khẩu sai'})
                })
            }
            else  res.status(202).json({message:'Không tìm thấy'})
        })
        .catch(next)
    }
    // GET account/verify
    verify(req,res,next){
       User.findOne({token:req.query.token})
      .then(user => {
        if(user.isVerified==false){
            user.isVerified=true
            user.save()
                }
      }
                )
        .catch(next)
       

    }
    //PUT /account/:token
       update(req,res,next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        Movie.updateOne({email: data.email} ,req.body)
        .then(() => res.json({message:'Đã cập nhập'}))
        .catch(next)
    }

    // GET account/me
    me(req,res,next){
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user => res.json(user) )
        .catch( next)
       
        
     }
     // POST account/logout  1 device
     logout(req,res,next){  
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user => { user.token=user.token.filter( (tokenlogout) => {return tokenlogout != token})
                        user.save()
                        res.json({message:'Đã đăng xuất'})
        })
        .catch(next)
        
     }

     // POST account/logout  all device
     logoutall(req,res,next){
        
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        // xóa tất cả token
        .then(user => { user.token.splice(0,user.token.length)
        user.save()
        res.json({message:'Đã đăng xuất khỏi tất cả thiết bị'})
        })
        .catch(next)
       
 
     }
     changepassword(req,res,next){
        
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
     
        .then(user => { 
            bcrypt.compare(req.body.oldpassword,user.password,function(err,result){
            if(err){
                res.json({message:'Mật khẩu cũ không đúng'})
            }
            if(result){
                bcrypt.hash(req.body.newpassword,10,function(err,hashedPass){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                user.password=hashedPass
                user.save()
                res.json({message:'thay đổi thành công'})
                    }})
            }
       
        })
    })
        .catch(next)
       
 
     }

     resetpassword(req,res,next){
         
        User.findOne({email: req.body.email },function(err,user){
            if(!err){
                const msg = {
                    to: user.email, // Change to your recipient
                    from: 'than123456qwe@gmail.com', // Change to your verified sender
                    subject: 'Cấp lại mật khẩu Le Do Cinema',
                    text: 'Tìm mật khẩu',
                    html: `<a href="http://${req.headers.host}/account/recieve?email=${user.email}">Vui lòng kích vào đây để nhận lại mật khẩu,Nếu không phải bạn yêu cầu cấp lại mật khẩu thì không cần làm gì</a>`,
                  }
                sgMail.send(msg)
                res.json({message:'Vui lòng vào email để nhận lại mật khẩu'})
            }
            else
            res.json({message:'Không tìm thấy tài khoản'})
            
        })
     }
     recieve(req,res,next){
        User.findOne({email:req.query.email})
        .then(user => {
          var  password=shortid.generate()
            bcrypt.hash(password,10,function(err,hashedPass){
                if(!err){
                    user.password=hashedPass
                    res.json({message:'Mật khẩu mới là '+password})
                    user.save()
                }
                else
                res.json({message:'ko mã hóa đc mk'})

            })
                      
        })
     
          .catch(next)
     }
     //POST /account/avartar
     avartar(req,res,next){
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })    
        .then(user => { 
            user.avartar = req.file.path  
            user.save()         
           res.json({message:'Đã cập nhập ảnh đại diện'})
        })
        .catch(next)
         
     
}
getAll(req,res,next) {
    const page = req.query.page
    const limit = req.query.limit
    const start = (page - 1 ) * limit
    const end = page * limit
    User.find({})
    .then(user => {
        res.json({
            user:user.slice(start,end),
            total:user.length
        })
    })
    .catch(next)
}

getAllWeek(req,res,next) {
    let d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); 
    const date = new Date(d.setDate(diff));
    console.log(date)
    User.find({createdAt:{
        $gte:date.toDateString()
    }})
    .then(user => {
        res.json(user.length)
    })
    .catch(next)
}
getAllMonth(req,res,next) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(firstDay)
     User.find({createdAt:{
        $gte:firstDay
    }})
    .then(user => {
        res.json(user.length)
    })
    .catch(next)
}
getAllYear(req,res,next) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), 0 , 1);
    console.log(new Date())
    User.find({createdAt:{
        $gte:firstDay
    }})
    .then(user => {
        res.json(user.length)
    })
    .catch(next)
}

edit(req,res,next) {
    console.log(req.body)
    User.findOne({_id: req.params.id })
    .then(user => {
       if( req.body.password == user.password) {
        User.updateOne({_id:req.params.id},req.body)
        .then(() =>{
            res.json('Đã cập nhật')
        })
        }
        else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                req.body.date = new Date(req.body.date)
                req.body.password = hash
                User.updateOne({_id:req.params.id},req.body) 
                .then(() => {
                    res.json('Đã cập nhật')
                })
            })
        
       }
    })
    .catch(next)
}

delete(req,res,next) {
    User.deleteOne({_id: req.params.id })
    .then(() => {
       res.json('Xóa thành công')
    })
    .catch(next)
}
}
module.exports = new AuthControllers;