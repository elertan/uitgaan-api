const Response  = require('../config/response'),
    HttpStatus  = require('http-status-codes');

class UsersService {
    constructor() {
        this.users = [];
    }

    login(user, callback) {
        let response = new Response();

        console.log(user);

        response.responseBody = 'logged in!';

        callback(response);
    }
}

module.exports = new UsersService();