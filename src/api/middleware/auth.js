const jwt = require('jsonwebtoken')
const User = require('../models/User')


 const auth=async(req, res, next) =>{
    const token =req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    
     const user= await User.findOne({email: data.email,token: token })
       req.user = user
       req.token = token
}


module.exports = auth;