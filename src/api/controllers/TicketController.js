
const Movie = require('../models/Movie')
const Movietime = require('../models/Movietime')
const Ticket = require('../models/Ticket')
const Theater = require('../models/Theater')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

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
   //action buy ticket
    //POST /Ticket/create      
    create(req,res,next) {
       
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user =>{
          
            req.body.user_id=user._id
             Movietime.findOne({_id:req.body.movietime_id})
            .then(movietime =>{          
                Movie.findOne({_id:movietime.movie_id})
                .then(movie=>{              
                    req.body.namemovie=movie.name
                    Theater.findOne({_id:movietime.theater_id})
                        .then(theater=>{
                                var n=0
                            for(var i = 0;i<movietime.seat.length;i++){
                                         for(var j =0;j<movietime.seat[i].length;j++){
                                             for(var s=0;s<req.body.seat.length;s++){ //s0=a1
                                                 if(movietime.seat[i][j].id==req.body.seat[s]){
                                                        if( movietime.seat[i][j].available==false){                                                  
                                                          movietime.seat[i][j].available=true
                                                                 n+=1            
                                                         }                                                      
                                                      }                           
                                                     }
                                                     }
                                                 }                                         
                                                 if(n==req.body.seat.length){
                                                    req.body.theater=theater.theater_number
                                                    req.body.total_price=  movietime.price * req.body.seat.length                         
                                                    const ticket =new Ticket(req.body);
                                                    ticket.save()   
                                                    movietime.save()               
                                                    res.json(ticket)
                                                 }
                                                 else res.json({mess:'vUI lòng chọn lại ghế'})
                        })
                        .catch(next)
                    })
                    .catch(next)                             
                })  
            .catch(next)
         
        
         })
         .catch(next)
    }
}


module.exports = new TicketControllers;