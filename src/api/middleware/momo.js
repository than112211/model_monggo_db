
const https = require('https');
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
const Movie = require('../models/Movie')
const Movietime = require('../models/Movietime')
const Ticket = require('../models/Ticket')
const Theater = require('../models/Theater')
const User = require('../models/User')
require('dotenv').config()


function deleteTicket(idticket){
  Ticket.findOne({_id:idticket})
  .then(ticket =>{
      if(ticket.paid==false){
          Ticket.deleteOne({_id:ticket._id})
      }
  })
 
  
}

module.exports = {deleteTicket};