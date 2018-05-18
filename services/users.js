const ApiResponse   = require('../config/apiresponse'),
    find            = require('lodash/find'),
    config          = require('../config/env'),
    auth            = require('../auth/authentication'),
    bCrypt          = require('bcrypt');

class UsersService {
    constructor() {
        this.users = [];
    }

    getUsers() {
        let apiResponse = new ApiResponse();

        apiResponse.responseBody = this.users;

        return apiResponse;
    }

    async login(user) {
        let apiResponse = new ApiResponse();

        try {
            let currUser = await find(this.users, { username: user.username });

            const res = await bCrypt.compare(user.password, currUser.password);

            if (res) {
                apiResponse.responseBody = "Logged in";

                return apiResponse;
            } else {
                apiResponse.succesfull = false;
                apiResponse.responseCode = 404;
                apiResponse.responseBody = "Incorrect password";

                return apiResponse;
            }
        } catch (e) {
            apiResponse.succesfull = false;
            apiResponse.responseCode = 404;
            apiResponse.responseBody = "User does not exist";

            return apiResponse;
        }
    }

    async registerUser(user) {
        let apiResponse = new ApiResponse();

        try {
            let isUser = await find(this.users, { username: user.username });
            if (isUser) {
                apiResponse.succesfull = false;
                apiResponse.responseCode = 404;
                apiResponse.responseBody = "User already exists";

                return apiResponse;
            } else {
                if (user.username.length < 5 || user.username.length > 14) {
                    apiResponse.succesfull = false;
                    apiResponse.responseCode = 401;
                    apiResponse.responseBody = "Username too long or too short";

                    return apiResponse;
                } else {

                    let userNameRegex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
                    if (userNameRegex.test(user.username)) {
                        let saltRounds = 10;

                        try {
                            let hash = await bCrypt.hash(user.password, saltRounds);
                            // let token = await auth.createToken(user.username);

                            user.password = hash;

                            this.users.push(user);

                            apiResponse.responseBody = { msg: "Successfully registered", user: user};

                            return apiResponse;
                        } catch (e) {
                            apiResponse.succesfull = false;
                            apiResponse.responseCode = 400;
                            apiResponse.responseBody = "Could not hash password";

                            return apiResponse;
                        }
                    } else {
                        apiResponse.succesfull = false;
                        apiResponse.responseCode = 401;
                        apiResponse.responseBody = 'Invalid username';

                        return apiResponse;
                    }
                }
            }
        } catch (e) {

        }
    }

    async registerFakeUsers(users) {
        for(let u = 0; u < users.length; u ++) {
            let saltRounds = 10;

            let hash = await bCrypt.hash(users[u].password, saltRounds);

            users[u].password = hash;

            this.users.push(users[u]);
        }
    }
}

module.exports = new UsersService();