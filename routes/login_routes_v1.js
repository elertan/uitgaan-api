const express       = require('express'),
    routes          = express.Router(),
    UsersService    = require('../services/users');

routes.get('/users', async (req, res) => {
    const response = await UsersService.getUsers();

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

routes.post('/register', async (req, res) => {
    const user = req.body;
    const response = await UsersService.registerUser(user);

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

routes.post('/login', async (req, res) => {
    const user = req.body
    const response = await UsersService.login(user);

    if (response.succesfull) {
        res.status(response.responseCode).json(response.responseBody)
    } else {
        if (response.responseBody) {
            res.status(response.responseCode).json({
                message: response.responseBody
            })
        } else {
            res.sendStatus(response.responseCode)
        }
    }
});

module.exports = routes;