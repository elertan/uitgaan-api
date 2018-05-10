const   express             = require('express'),
        app                 = express(),
        login_routes_v1     = require('./routes/login_routes_v1'),
        config              = require('./config/env'),
        bodyParser          = require('body-parser');

app.use(bodyParser.json());

app.use('/login', login_routes_v1);

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'This URL is not available.'
    });
});

app.listen(config.env.webPort, function () {
    console.log('Listening on port: ' + config.env.webPort);
});