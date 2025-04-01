const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    subject:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    team: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
}, {timestamps:true})
module.exports = mongoose.model("Ticket",ticket)