const express = require('express')
const jwt = require('jsonwebtoken');
const router = express()
//function to verify that the token given is really a token
const verifyJWT = (req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.sendStatus(404)
    }else{
        jwt.verify(token, process.env.PRIVAT_KEY,(err, decoded)=>{
            if(err){
                return res.sendStatus(404)
            }else{
                next()
            }
        })
    }
}
router.get('/', verifyJWT,(req,res)=>{
    return res.sendStatus(200)
})

module.exports = router