const express = require('express')
const jwt = require('jsonwebtoken');
const router = express();
const bcrypt = require('bcryptjs')
const Signup = require('../models/singup');
//this route is used to login the user
router.post('/', async (req,res)=>{
    try {
        const findUserbyEmail = await Signup.findOne({email: req.body.email})
        if(findUserbyEmail != null){
            if(bcrypt.compareSync(req.body.password, findUserbyEmail['password'])){
                const token = jwt.sign({team: findUserbyEmail['team'], name: findUserbyEmail['name']},process.env.PRIVAT_KEY, {expiresIn: '1h'})
                return res.json({token:token});
            }else{
                return res.sendStatus(202);
            }
        }else{
            return res.sendStatus(204);
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;