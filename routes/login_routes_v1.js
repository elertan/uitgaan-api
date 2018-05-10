const express       = require('express'),
    routes          = express.Router(),
    UsersService    = require('../services/users');

routes.post('*', function(req, res) {
    const user = req.body;

    UsersService.login(user, (response) => {
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
    })
});

module.exports = routes;