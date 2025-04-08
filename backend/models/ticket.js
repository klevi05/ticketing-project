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

ticket.set('toJSON', {
    transform: function (doc, ret) {
        const createdAt = new Date(ret.createdAt);
        const updatedAt = new Date(ret.updatedAt);

        const pad = (n) => n < 10 ? '0' + n : n;

        ret.createdAtFormatted = `${pad(createdAt.getHours())}:${pad(createdAt.getMinutes())}`;
        ret.createdDateFormatted = `${pad(createdAt.getDate())}/${pad(createdAt.getMonth() + 1)}/${createdAt.getFullYear()}`;

        ret.updatedAtFormatted = `${pad(updatedAt.getHours())}:${pad(updatedAt.getMinutes())}`;
        ret.updatedDateFormatted = `${pad(updatedAt.getDate())}/${pad(updatedAt.getMonth() + 1)}/${updatedAt.getFullYear()}`;

        return ret;
    }
});
module.exports = mongoose.models.Ticket || mongoose.model("Ticket", ticket);
