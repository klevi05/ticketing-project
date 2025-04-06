const express = require('express')
const router = express()
const Ticket = require('../models/ticket')
router.get('/', async (req, res)=>{
    const headerId = req.headers['tab-t-id']
    const headerAction = req.headers['tab-t-action']
    if(!headerId || !headerAction){
        return res.sendStatus(404)
    }
    
    const findTicket = await Ticket.findOne({_id: headerId})
    if(findTicket!=null){
        try {
            switch(headerAction){
                case 'Close':
                case 'Open':
                    try {
                        const updateStatus = await Ticket.findByIdAndUpdate(
                            headerId,
                            {
                                status: headerAction
                            }
                            ,{new: true}
                        );
                        updateStatus.save()
                        return res.sendStatus(200)
                    } catch (error) {
                        return res.sendStatus(500)
                    }
                case 'Delete':
                    try {
                        const deleteTicket = await Ticket.findByIdAndDelete({_id: headerId});
                        return res.sendStatus(200);
                    } catch (error) {
                        console.log(error) 
                        return res.sendStatus(500)  
                    }
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        return res.sendStatus(404)
    }
})
module.exports = router