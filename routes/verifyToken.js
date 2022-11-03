const jwt = require('jsonwebtoken');

const verifyToken =(req, res,next ) =>{
const authHeader = req.headers.token
if(authHeader){
jwt.verify(token, "secret",(err,user)=>{
    if(err){
        res.status(403).json("token is invalid")
    }
})
}else{
    return res.status(401).json("you are not authorized")
}
}
const verifyTokenAndAuthorization=(req, res,next) => {
verifyToken(req, res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    }else{
        res.status(403).json("You are not allowed to access this")
    }
})
}

module.exports = {verifyToken, verifyTokenAndAuthorization}