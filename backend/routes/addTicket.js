const express = require('express')
const router = express()
const Ticket = require('../models/ticket')
//this route is used to add a new ticket to the database
router.post('/', async(req, res)=>{
    const addNew = new Ticket({
        subject: req.body.subject,
        description: req.body.description,
        team: req.body.team,
        status: req.body.status
    })
    try{
        if(req.body.subject && req.body.team && req.body.status != ''){
            const saveTicket = await addNew.save();
            return res.sendStatus(200)
        }else{
            return res.sendStatus(404)
        }
    }catch(err){
        console.log(err)
    }
})
module.exports = router