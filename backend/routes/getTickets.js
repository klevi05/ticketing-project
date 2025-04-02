const express = require('express');
const router = express();
const Ticket = require('../models/ticket')
//this router is used to return all the tickets     
router.get('/', async (req, res)=>{
    try{
        const ticketsList = await Ticket.find({});
        return res.send(ticketsList)
    }catch(err){
        console.log(err)
        return res.sendStatus(500).json({message: "There is something wrong with our server!"})
    }
})
module.exports = router