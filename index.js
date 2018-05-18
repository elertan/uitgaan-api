const   express             = require('express'),
        app                 = express(),
        login_routes_v1     = require('./routes/login_routes_v1'),
        events_routes_v1    = require('./routes/events_routes_v1'),
        config              = require('./config/env'),
        UserService         = require('./services/users'),
        EventsService       = require('./services/events'),
        webPush             = require('web-push'),
        path                = require('path'),
        jwt                 = require('express-jwt'),
        bodyParser          = require('body-parser');
        users               = [
            {
                username: 'John Wick',
                password: 'Rabbit'
            },
            {
                username: 'Yoshi Green',
                password: 'Mario'
            },
            {
                username: 'Sarah Goose',
                password: 'Yoshi'
            },
            {
                username: 'Eva Yell',
                password: 'Monkey'
            }
        ];
        events              = [
            {
                id: 0,
                name: 'Beurs Studentenavond',
                description: 'Voor alle paupers!',
                price: 2500,
                date: '23-05-2018',
                image: 'https://sfeerhoreca.smugmug.com/CafedeBeurs/Zaterdag-10-mei-2014-Cafe/i-KTBNS3P/0/f4a4e608/M/20140510_Sila_Beurs-14-M.jpg'
            },
            {
                id: 1,
                name: 'Snollebollekes Skihut',
                description: 'Lekker fout!',
                price: 1000,
                date: '28-05-2018',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rob_kemps_zanger_snollebollekes_-1479113607.jpeg/266px-Rob_kemps_zanger_snollebollekes_-1479113607.jpeg'
            },
            {
                id: 2,
                name: 'Villa Thalia VIP',
                description: 'Be a special guest with this VIP ticket!',
                price: 5000,
                date: '29-05-2018',
                image: 'http://www.clubvillathalia.nl/wp-content/uploads/sites/16/2015/01/Viptable-1-300x200.jpg'
            },
        ];

UserService.registerFakeUsers(users);
EventsService.registerFakeEvents(events);

// var publicVapidKey = 'BEbIg-frypmiOpw_p3xLODjRdcRjCYGSKGFmtXd7bGQGp_aDV7-bJlkDYwLH9YfN3qPTa191_3_-kWSgt3LxIX4';
// var privateVapidKey = 'kpizbUCpHeGuuXiqnvNLbqc62_5NQ-2qIC0IMUTStOQ';
//
// webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
//
// app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;
//
//     res.status(201).json({});
//
//     const payload = JSON.stringify({ title: 'Push Test' });
//
//     webPush.sendNotification(subscription, payload).catch(err => console.log(err));
// });

// app.use(jwt({
//     secret: process.env.SECRET_KEY || config.secretKey
// }).unless({
//     path: [
//         { url: '/auth/login', methods: ['POST']},
//         { url: '/auth/register', methods: ['POST']}
//     ]
// }));

app.use('/auth', login_routes_v1);
app.use('/events', events_routes_v1);

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'This URL is not available.'
    });
});

app.listen(config.env.webPort, function () {
    console.log('Listening on port: ' + config.env.webPort);
});