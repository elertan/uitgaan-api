let jwt         = require('jsonwebtoken'),
    UserService = require('../services/users'),
    config      = require('../config/env');

let secret = process.env.SECRET_KEY || config.env.secretKey;

function createToken(username) {
    const payload = {
        sub: {
            "username": username
        }
    };

    return jwt.sign(payload, secret, {
        expiresIn: 86400 // 24h
    });
}

function decodeToken(token, mustBeSplit = true) {
    let tokenToVerify;
    if(mustBeSplit) {
        tokenToVerify = token.split(' ')[1]
    } else {
        tokenToVerify = token;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(tokenToVerify, secret, (err, decoded) => {
            if(err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    });
}

module.exports = {
    createToken,
    decodeToken
};