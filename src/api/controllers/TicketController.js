
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
    //POST /Ticket/:id movietime/create      
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
                                var price;
                            // for(var i = 0;i<movietime.seat.length;i++){ 
                            //     for(var j =0;j<movietime.seat[i].length;j++){
                            //         for(var s=0;s<req.body.seat.length;s++){
                            //             if(movietime.seat[i][j].id==req.body.seat[s]){
                            //                 if( movietime.seat[i][j].available==false){                                                  
                            //                     movietime.seat[i][j].available=true
                            //                     n+=1            
                            //                                     }                                                    
                            //                                 }                           
                            //                              }
                            //                         } 
                            //                     }       
                            for(var h=0;h<movietime.movietime.times.length;h++){
                                if(req.body.hour==movietime.movietime.times[h].hour){
                                    price=movietime.movietime.times[h].price
                                    for(var i = 0;i<movietime.movietime.times[h].seat.length;i++){ 
                                            for(var j =0;j<movietime.movietime.times[h].seat[i].length;j++){
                                                for(var s=0;s<req.body.seat.length;s++){
                                                    if(movietime.movietime.times[h].seat[i][j].id==req.body.seat[s]){
                                                        if( movietime.movietime.times[h].seat[i][j].available==false){                                                  
                                                            movietime.movietime.times[h].seat[i][j].available=true
                                                            n+=1            
                                                                            }                                                    
                                                                        }                           
                                                                     }
                                                                } 
                                                            }       
                                   
                                }
                            }
                                                // nếu gift == null thì save , !nul thì giá - gift rồi save                                  
                                                if(n==req.body.numberticket ){
                                                   
                                                    // // tìm giá của suất chiếu
                                                    // for(var i=0;i<movietime.movietime.times.length;i++){
                                                    //     if(movietime.movietime.times[i].hour ==req.body.hour){
                                                    //         price=movietime.movietime.times[i].price
                                                    //     }
                                                    // }
                                                    req.body.theater=theater.theater_number
                                                    req.body.date=movietime.movietime.date

                                                    req.body.total_price= req.body.numberticket  * price                      
                                                    const ticket =new Ticket(req.body);
                                                    ticket.save()   
                                                    movietime.save() 
                                                    user.point= user.point+(req.body.total_price/10000 )  
                                                    user.save()        
                                                    res.json(ticket)
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
}


module.exports = new TicketControllers;