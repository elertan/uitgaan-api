const express       = require('express'),
    routes          = express.Router(),
    EventsService    = require('../services/events');

routes.get('/events', async (req, res) => {
    const response = await EventsService.getEvents();

    if (response.succesfull) {
        res.status(response.responseCode).json(response.responseBody)
    } else {
        if (response.responseBody){
            res.status(response.responseCode).json({
                message: response.responseBody
            })
        } else {
            res.sendStatus(response.responseCode)
        }
    }
});

module.exports = routes;