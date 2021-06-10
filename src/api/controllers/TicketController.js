
const Movie = require('../models/Movie')
const Movietime = require('../models/Movietime')
const Ticket = require('../models/Ticket')
const Theater = require('../models/Theater')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const https = require('https');
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
const momo = require('../middleware/momo')
const sgMail = require('@sendgrid/mail')

require('dotenv').config()

class TicketControllers {

     //get /Ticket/  //view history ticket
    
     show(req,res,next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
    User.findOne({email: data.email,token: token })
    .then(user =>{
        Ticket.find({user_id :user._id})
    // nhận về colecttion Ticket theo id user 
        .then(ticket =>  res.json(ticket))
        .catch(next)
    })

    
       
    }

    delete(req,res,next) {
    
        Ticket.findOne({_id: req.params.id })
        .then(ticket =>{
            ticket.status = false
            ticket.save()
            Movietime.findOne({_id:ticket.movietime_id})
            .then(movietime =>{          
                for( let i = 0 ; i < req.body.seat.length ; i++ ){
                    movietime.movietime.seat.map(seats =>{
                        seats.map(seat =>{
                            if(req.body.seat.indexOf(seat.id) >= 0) {
                                seat.available = true
                                movietime.save()
                            }
                        })
                    })
                }
    })
})

    
       
    }
  
    paymentMoMo(req,response,next){
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user =>{
            if(req.body.gift){
                user.gift_code.splice(user.gift_code.indexOf(req.body.gift),1)  
                user.save()
            }
            req.body.user_id=user._id
             Movietime.findOne({_id:req.params.id})
            .then(movietime =>{      
                req.body.movietime_id = movietime._id    
                for( let i = 0 ; i < req.body.seat.length ; i++ ){
                    movietime.movietime.seat.map(seats =>{
                        seats.map(seat =>{
                            if(req.body.seat.indexOf(seat.id) >= 0) {
                                seat.available = false
                            }
                        })
                    })
                }
                Movie.findOne({_id:movietime.movie_id})
                .then(movie=>{              
                    req.body.namemovie=movie.name
                    Theater.findOne({_id:movietime.theater_id})
                        .then(theater=>{
                            req.body.theater = theater.name
                            req.body.hour=movietime.movietime.hour
                            req.body.date=movietime.movietime.date
                            movietime.save()
                            const ticket =new Ticket(req.body);                                         
                            ticket.save()
                            var rawSignature = "partnerCode="+process.env.PARTNER+"&accessKey="+process.env.ACCESSKEY+"&requestId="+ticket._id+"&amount="+ticket.price+"&orderId="+ticket._id+"&orderInfo=payment"+"&returnUrl=http://localhost:8080/ticket/result"+"&notifyUrl=http://localhost:8080/ticket/result"+"&extraData="
                            var sign=  CryptoJS.HmacSHA256(rawSignature,process.env.SECRET_KEY)
                            var body=  JSON.stringify(
                            {
                                "accessKey": process.env.ACCESSKEY,
                                "partnerCode": process.env.PARTNER,
                                "requestType": "captureMoMoWallet",
                                "notifyUrl": "http://localhost:8080/ticket/result",
                                "returnUrl": "http://localhost:8080/ticket/result",
                                "orderId": ticket._id,
                                "amount": String(ticket.price),
                                "orderInfo": "payment",
                                "requestId":ticket._id,
                                "extraData": "",
                                "signature": String(sign)
                              })
                              var options = {
                                hostname: 'test-payment.momo.vn',
                                port: 443,
                                path: '/gw_payment/transactionProcessor',
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Content-Length': Buffer.byteLength(body)
                               }
                              }
                            
                              var reqe = https.request(options, (res) => {
                                res.setEncoding('utf8');
                                res.on('data', (body) => {
                                  response.json({link:JSON.parse(body).payUrl})
                                })
                            })
                              reqe.write(body);
                              reqe.end();      
                        })
                })
             })
        })
        .catch(next)
    
         
    }
    resultpayment(req,res,next){
        Ticket.findOne({_id:req.query.orderId})
            .then(ticket=>{
                User.findOne({_id:ticket.user_id})
                .then(user =>{
                  
                    if(req.query.errorCode==0){
                        ticket.paid =true
                        var   point = ticket.price /10000
                        
                        ticket.save()
                        user.point = user.point + point
                        user.save()
                        res.redirect('http://localhost:4200/?payment=0')
                        // const msg = {
                        //     to: user.email, // Change to your recipienttie
                        //     from: 'than123456qwe@gmail.com', // Change to your verified sender
                        //     subject: 'Thông tin vé',
                        //     text: 'Tìm mật khẩu',
                        //     html: `<h1>Thông tin vé của bạn</h1>
                        //     <ul>
                        //     <li>Tên phim :${ticket.namemovie}</li>
                        //     <li>Ngày:${ticket.date}</li>
                        //     <li>Gio:${ticket.hour}</li>
                        //     <li>Số ghế:${ticket.seat}</li>
                        //     <li>Tổng tiền:${ticket.total_price}</li>
                        //  </ul>
                        //  <p>Cảm ơn đã sử dụng dịch vụ của chúng tôi</p>
                        //     `,
                        //   }
                        // sgMail.send(msg)
                         
                    }
                    else                                      res.redirect('http://localhost:4200/?payment=1')


                           
                })
                .catch(next)
                 
        })
        .catch(next)
    }
 

}


module.exports = new TicketControllers;