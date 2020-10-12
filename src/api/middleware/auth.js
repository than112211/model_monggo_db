const jwt = require('jsonwebtoken')
const User = require('../models/User')
class authMidle{

    auth (req, res, next){
    const token = req.header('auth-token')
    const data = jwt.verify(token, process.env.JWT_KEY)
    
      const user=  User.findOne({email: data.email,token: token })
        req.user = user
}}


module.exports = new authMidle;