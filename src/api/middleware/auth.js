const jwt = require('jsonwebtoken')
const User = require('../models/User')
class authMidle{

    auth (req, res, next){
    const token = req.header('Authorizatation').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = User.findOne({name: data.name, token: token })
        if (!user) {
            throw new Error()
        }
        
        req.user = user
      
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

}
module.exports = new authMidle;