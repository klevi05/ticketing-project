const express = require('express')
const router = express();
const Signup = require('../models/singup');
const singup = require('../models/singup');
router.post('/', async(req,res)=>{
    const signup = new Signup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        team : req.body.team
    })
    try{
        const userFindEmail = await singup.findOne({email: req.body.email})
        if(userFindEmail!= null){
            return res.sendStatus(204)
        }else{
            const saveUser = await signup.save();
            return res.sendStatus(200)
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router;