
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

    show(req, res, next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({ email: data.email, token: token })
            .then(user => {
                Ticket.find({ user_id: user._id })
                    // nhận về colecttion Ticket theo id user 
                    .then(ticket => res.json(ticket))
                    .catch(next)
            })

    }

    //POST /Ticket/:id movietime/create     
    create(req, res, next) {

        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({ email: data.email, token: token })
            .then(user => {

                req.body.user_id = user._id
                Movietime.findOne({ _id: req.params.id })
                    .then(movietime => {
                        Movie.findOne({ _id: movietime.movie_id })
                            .then(movie => {
                                req.body.namemovie = movie.name
                                Theater.findOne({ _id: movietime.theater_id })
                                    .then(theater => {

                                        var n = 0

                                        req.body.seat = JSON.parse(req.body.seat)
                                        for (var j = 0; j < movietime.movietime.seat.length; j++) {
                                            for (var k = 0; k < movietime.movietime.seat[j].length; k++)

                                                for (var s = 0; s < req.body.seat.length; s++) {
                                                    if (movietime.movietime.seat[j][k].id == req.body.seat[s]) {
                                                        if (movietime.movietime.seat[j][k].available == false) {
                                                            movietime.movietime.seat[j][k].available = true
                                                            n += 1
                                                        }
                                                    }
                                                }
                                        }
                                        // nếu gift == null thì save , !nul thì giá - gift rồi save                                  
                                        if (n == req.body.numberticket) {
                                            // nếu ko nhập code
                                            if (!req.body.code_gift) {
                                                req.body.hour = movietime.movietime.hour
                                                req.body.theater = theater.theater_number
                                                req.body.date = movietime.movietime.date
                                                req.body.total_price = req.body.numberticket * movietime.movietime.price
                                                req.body.paid = false
                                                const ticket = new Ticket(req.body);

                                                ticket.save()
                                                movietime.save()
                                                // user.point= user.point+(req.body.total_price/10000 )  
                                                // user.save()        
                                                res.json(ticket)
                                                setTimeout(this.deleteTicket(ticket._id), 600000) // sau 10p ko thanh toán thì hủy vé


                                            }
                                            else {      // nếu nhập code
                                                for (var i = 0; i < user.gift_code.length; i++) {
                                                    if (user.gift_code[i].code == req.body.code_gift) {

                                                        req.body.hour = movietime.movietime.hour
                                                        req.body.theater = theater.theater_number
                                                        req.body.date = movietime.movietime.date
                                                        req.body.paid = false

                                                        req.body.total_price = (req.body.numberticket * movietime.movietime.price) - user.gift_code[i].value
                                                        user.gift_code.splice(i, 1)
                                                        const ticket = new Ticket(req.body);


                                                        ticket.save()
                                                        movietime.save()
                                                        // user.point= user.point+(req.body.total_price/10000 )  
                                                        user.save()
                                                        res.json(ticket)

                                                        setTimeout(fetch('http://localhost:3000/ticket/' + ticket._id, { method: 'DELETE' }), 600000) // sau 10p ko thanh toán thì hủy vé

                                                    }
                                                    else res.json({ message: 'Code không đúng, Kiểm tra lại' })
                                                }


                                            }
                                        }

                                        else res.json({ message: 'Vui lòng chọn đủ ' + req.body.numberticket + ' ghế' })
                                    })
                                    .catch(next)
                            })
                            .catch(next)
                    })
                    .catch(next)


            })
            .catch(next)
    }





    paymentMoMo(req, res, next) {
        Ticket.findOne({ _id: req.params.id })
            .then(ticket => {
                var rawSignature = "partnerCode=" + process.env.PARTNER + "&accessKey=" + process.env.ACCESSKEY + "&requestId=" + ticket._id + "&amount=" + ticket.total_price + "&orderId=" + ticket._id + "&requestType=captureMoMoWallet&orderInfo=payment" + "&returnUrl=http://localhost:3000/ticket/paymentMoMo/resultpayment" + "&notifyUrl=http://localhost:3000/ticket/paymentMoMo/resultpayment" + "&extraData=" + ticket.user_id
                var sign = CryptoJS.HmacSHA256(rawSignature, process.env.SECRET_KEY)
                let body = JSON.stringify(
                    {
                        "accessKey": process.env.ACCESSKEY,
                        "partnerCode": process.env.PARTNER,
                        "requestType": "captureMoMoWallet",
                        "notifyUrl": "http://localhost:3000/ticket/paymentMoMo/resultpayment",
                        "returnUrl": "http://localhost:3000/ticket/paymentMoMo/resultpayment",
                        "orderId": ticket._id,
                        "amount": String(ticket.total_price),
                        "orderInfo": "payment",
                        "requestId": ticket._id,
                        "extraData": ticket.user_id,
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
                var req = https.request(options, (resa) => {
                    console.log(`Status: ${resa.statusCode}`);
                    console.log(`Headers: ${JSON.stringify(resa.headers)}`);
                    resa.setEncoding('utf8');
                    resa.on('data', (body) => {
                        console.log('Body')
                        console.log(body)
                        console.log('URL')
                        console.log(JSON.parse(body).payUrl)
                        res.json({ link: JSON.parse(body).payUrl })
                    })
                })
                req.write(body);
                req.end();

            })
            .catch(next)
    }




    deleteTicket(req, res, next) {
        Ticket.findOne({ _id: req.params.id })
            .then(ticket => {
                if (ticket.paid == false) {
                    Ticket.deleteOne({ _id: req.params.id })
                    // User.findOne({_id:ticket.user_id})
                    // .then(user =>{
                    //         user.gift_code
                    // })

                }
            })


    }
    resultpayment(req, res, next) {
        const token = req.header('auth-token')
        Ticket.findOne({ _id: req.query.orderId })
            .then(ticket => {
                User.findOne({ _id: req.query.extraData })
                    .then(user => {

                        if (req.query.errorCode == 0) {
                            ticket.paid = true
                            var point = ticket.total_price / 10000
                            ticket.save()
                            user.point = point
                            user.save()
                            if (req.query.errorCode == '0' && req.query.message == 'Success') {
                                res.redirect(`http://localhost/thongBao/${req.query.errorCode}/${req.query.localMessage}`)
                            }
                        }
                        else res.redirect(`http://localhost/thongBao/${req.query.errorCode}/${req.query.localMessage}`)

                    })
                    .catch(next)

            })
            .catch(next)
    }
}


module.exports = new TicketControllers;