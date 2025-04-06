const express = require('express');
const router = express();
const Ticket = require('../models/ticket')
//this router is used to return all the tickets     
router.get('/', async (req, res)=>{
    const team = req.headers['x-access-team'];
    try{
        const ticketsList = await Ticket.find({'team': team }).sort({updatedAt: 1}).limit(10);
        return res.send(ticketsList)
    }catch(err){
        console.log(err)
        return res.sendStatus(500).json({message: "There is something wrong with our server!"})
    }
})
module.exports = router