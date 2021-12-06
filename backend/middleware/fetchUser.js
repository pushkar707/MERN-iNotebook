const JWT = require('jsonwebtoken')

const jwtKey = 'This is a secret key'

const fetchUser = (req,res,next)=>{
    //Getting User from JWT token 

    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send('Please Add a Token.')
    }

    try {
        const data = JWT.verify(token , jwtKey);
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send('Please Authenticate a Valid Token.')
    }
}

module.exports = fetchUser