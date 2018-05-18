const env = {
    webPort: process.env.PORT || 3000
},
    secretKey = 'abracadabra';

module.exports = {
    env: env,
    'secretKey': secretKey
};