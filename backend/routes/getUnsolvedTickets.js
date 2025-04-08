const express = require('express');
const Ticket = require('../models/ticket');
const router = express();

const ALL_TEAMS = ['Support', 'Development', 'Sales'];
router.get('/', async (req,res)=>{
    try {
        const aggregation = await Ticket.aggregate([
            {
                $match: {
                    status: { $in: ['New', 'Open'] }
                }
            },
            {
                $group: {
                    _id: '$team',
                    openTickets: { $sum: 1 }
                }
            }
        ]);

        // Convert aggregation result into a map
        const resultMap = {};
        aggregation.forEach(item => {
            resultMap[item._id] = item.openTickets;
        });

        // Build final result with all teams
        const result = ALL_TEAMS.map(team => ({
            team,
            openTickets: resultMap[team] || 0
        }));

        return res.json(result);
    } catch (error) {
        return res.sendStatus(404)
    }
})
module.exports = router