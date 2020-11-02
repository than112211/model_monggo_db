
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
   
    //POST /Ticket/:id movietime/id :time/create     
    create(req,res,next) {
       
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user => {
          
            req.body.user_id=user._id
             Movietime.findOne({_id:req.params.id})
            .then(movietime =>{          
                Movie.findOne({_id:movietime.movie_id})
                .then(movie=>{              
                    req.body.namemovie=movie.name
                    Theater.findOne({_id:movietime.theater_id})
                        .then(theater=>{
                            
                                var n=0
                                var price,hour;
                                for(var i=0 ;i<movietime.movietime.times.length;i++){
                                  if(  movietime.movietime.times[i]._id==req.params.time){      
                                        hour=movietime.movietime.times[i].hour
                                        price=movietime.movietime.times[i].price
                                        for(var j = 0;j<movietime.movietime.times[i].seat.length;j++){ 
                                            for(var k=0;k<movietime.movietime.times[i].seat[j].length;k++) 
                                              
                                                    for(var s=0;s<req.body.seat.length;s++){
                                                        if(movietime.movietime.times[i].seat[j][k].id==req.body.seat[s]){
                                                            if( movietime.movietime.times[i].seat[j][k].available==false){                                                  
                                                                movietime.movietime.times[i].seat[j][k].available=true
                                                                n+=1            
                                                                                }  
                                                                            }                                                  
                                                                            }                           
                                                                         }
                                                                    } 
                                                                }       
                                 
                                  
                           
                           
                                                // nếu gift == null thì save , !nul thì giá - gift rồi save                                  
                                                if(n==req.body.numberticket ){
                                                    // nếu ko nhập code
                                                   if(req.body.code_gift == null){
                                                    req.body.hour=hour
                                                    req.body.theater=theater.theater_number
                                                    req.body.date=movietime.movietime.date

                                                    req.body.total_price= req.body.numberticket  * price   
                                                           req.body.paid = false          
                                                    const ticket =new Ticket(req.body);
                                                   
                                                    
                                                        ticket.save()   
                                                        movietime.save() 
                                                        user.point= user.point+(req.body.total_price/10000 )  
                                                        user.save()        
                                                        res.json(ticket)
                                                     
                                              
                                                   
                                                   }
                                                   else{      // nếu nhập code
                                                       for(var i=0;i<user.gift_code.length;i++){
                                                           if(user.gift_code[i].code == req.body.code_gift){

                                                            req.body.hour=hour
                                                    req.body.theater=theater.theater_number
                                                    req.body.date=movietime.movietime.date
                                                    req.body.paid = false          

                                                            req.body.total_price= (req.body.numberticket  * price ) - user.gift_code[i].value    
                                                                  
                                                            const ticket =new Ticket(req.body);
                                                   
                                                    
                                                            ticket.save()   
                                                            movietime.save() 
                                                            user.point= user.point+(req.body.total_price/10000 )  
                                                            user.save()        
                                                            res.json(ticket)
                                                           }
                                                           else  res.json({message:'Code không đúng, Kiểm tra lại'})
                                                       }
                                                    

                                                   }
                                                 }
                                              
                                                else res.json({mess:'Vui lòng chọn đủ '+req.body.numberticket+' ghế'})
                        })
                        .catch(next)
                    })
                    .catch(next)                             
                })  
            .catch(next)
         
        
         })
         .catch(next)
    }



    
       
    paymentMoMo(req,res,next){
        Ticket.findOne({_id:req.params.id})
            .then(ticket=>{
                momo.payment(ticket._id+'1234',ticket.total_price,ticket._id+'1',ticket._id)

                if(req.query.errorCode==0){
                    ticket.paid =true
                    ticket.save()
                        res.json({MESS:req.query.errorCode,
                            
                                   STATUS:req.query.message })}
                else res.json({MESS:req.query.errorCode,
                            
                    STATUS:req.query.message })
                       
                        
        })
        .catch(next)
   
    
    }
    deleteTicket(req,res,next){
        
    }
}


module.exports = new TicketControllers;