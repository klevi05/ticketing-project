const express = require('express')
const router = express();
const ticket = require('../models/ticket');

router.post('/', async (req,res)=>{
    try {
        const findTicket = await ticket.findById(req.body._id)
        if(findTicket){
            const updateTicket = await ticket.findByIdAndUpdate(
                req.body._id,
                {
                    subject: req.body.subject,
                    description: req.body.description,
                    team: req.body.team,
                    status: req.body.status
                },
                {new:true}
            );
            if(!updateTicket){
                return res.sendStatus(404)
            }  
            updateTicket.save();
            return res.sendStatus(200)
        }else{
            return res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(500)
    }
})
module.exports = router