const   express             = require('express'),
        app                 = express(),
        login_routes_v1     = require('./routes/login_routes_v1'),
        events_routes_v1    = require('./routes/events_routes_v1'),
        config              = require('./config/env'),
        UserService         = require('./services/users'),
        EventsService       = require('./services/events'),
        jwt                 = require('express-jwt'),
        bodyParser          = require('body-parser');
        users               = [
            {
                "id": "1",
                "firstname": "Blake",
                "lastname": "Murray",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/sergeyalmone/128.jpg",
                "username": "Marianna_Grimes7",
                "password": "vj4sngi2y1Jma3A",
                "dateofbirth": "2017-09-05T01:32:10.718Z"
            },
            {
                "id": "2",
                "firstname": "Carmen",
                "lastname": "Cronin",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/sethlouey/128.jpg",
                "username": "Barrett57",
                "password": "3CRuKDe3XvzLW9q",
                "dateofbirth": "2018-02-07T06:43:36.698Z"
            },
            {
                "id": "3",
                "firstname": "Loy",
                "lastname": "Luettgen",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marklamb/128.jpg",
                "username": "Fiona_Kshlerin51",
                "password": "feolXbVMiN01Wor",
                "dateofbirth": "2018-04-30T02:06:39.230Z"
            },
            {
                "id": "4",
                "firstname": "Laila",
                "lastname": "McClure",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg",
                "username": "Aniya59",
                "password": "QED5QOVC8sl90Xp",
                "dateofbirth": "2017-12-26T13:39:59.043Z"
            },
            {
                "id": "5",
                "firstname": "Marquis",
                "lastname": "Hills",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/pcridesagain/128.jpg",
                "username": "Earl76",
                "password": "xKWUh6Li1aJiHVx",
                "dateofbirth": "2017-11-28T22:58:00.122Z"
            },
            {
                "id": "6",
                "firstname": "Cecelia",
                "lastname": "Abshire",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/128.jpg",
                "username": "Benjamin.Kuhlman2",
                "password": "oaVdU1UWAQGkEmX",
                "dateofbirth": "2017-10-20T03:39:58.712Z"
            },
            {
                "id": "7",
                "firstname": "Cierra",
                "lastname": "Murphy",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geobikas/128.jpg",
                "username": "Robbie.Thompson",
                "password": "dfxzetClPHP7Vpb",
                "dateofbirth": "2017-07-08T00:55:24.986Z"
            },
            {
                "id": "8",
                "firstname": "Ozella",
                "lastname": "Cormier",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/scottfeltham/128.jpg",
                "username": "Missouri1",
                "password": "ByL70fMwOGc9Kbj",
                "dateofbirth": "2017-07-01T13:40:12.369Z"
            },
            {
                "id": "9",
                "firstname": "Ernest",
                "lastname": "Ullrich",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/luxe/128.jpg",
                "username": "Brook83",
                "password": "5BG7Mm4vYIfSHdt",
                "dateofbirth": "2018-02-22T13:57:42.652Z"
            },
            {
                "id": "10",
                "firstname": "Lori",
                "lastname": "Shanahan",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bpartridge/128.jpg",
                "username": "Harmon.Rau2",
                "password": "EPRRtkZWeTNtSl0",
                "dateofbirth": "2017-08-03T15:49:52.840Z"
            },
            {
                "id": "11",
                "firstname": "Gabrielle",
                "lastname": "Larson",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/toddrew/128.jpg",
                "username": "Aglae.Christiansen",
                "password": "GPEf4u99bDHj5nW",
                "dateofbirth": "2017-11-29T02:49:22.339Z"
            },
            {
                "id": "12",
                "firstname": "Verona",
                "lastname": "Davis",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/8d3k/128.jpg",
                "username": "Cierra_Langworth85",
                "password": "cx5TBQuiQcFWZZI",
                "dateofbirth": "2018-04-10T03:02:57.039Z"
            },
            {
                "id": "13",
                "firstname": "Dagmar",
                "lastname": "Maggio",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/el_fuertisimo/128.jpg",
                "username": "Ludie22",
                "password": "ROkdkGKhtaTOTWh",
                "dateofbirth": "2017-07-12T16:32:04.752Z"
            },
            {
                "id": "14",
                "firstname": "Shania",
                "lastname": "Reinger",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vm_f/128.jpg",
                "username": "Abagail88",
                "password": "w1By7Qi5_V_56Wn",
                "dateofbirth": "2018-05-13T05:20:28.991Z"
            },
            {
                "id": "15",
                "firstname": "Oran",
                "lastname": "Jones",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/gmourier/128.jpg",
                "username": "Meghan.Mosciski",
                "password": "LGa6nZ7jXaSLTNB",
                "dateofbirth": "2017-08-17T08:25:17.685Z"
            },
            {
                "id": "16",
                "firstname": "Rosario",
                "lastname": "Wolff",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/curiousonaut/128.jpg",
                "username": "Erick20",
                "password": "f9iAAxeV7nT5rUH",
                "dateofbirth": "2018-01-10T18:13:32.692Z"
            },
            {
                "id": "17",
                "firstname": "Audrey",
                "lastname": "Shanahan",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/rikas/128.jpg",
                "username": "Jaime_Langosh81",
                "password": "Vul7BwumWBGJRul",
                "dateofbirth": "2017-08-04T20:00:11.704Z"
            },
            {
                "id": "18",
                "firstname": "Kylee",
                "lastname": "O'Hara",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg",
                "username": "Charlene_Hintz0",
                "password": "Mjv5aH9FCAtWzEa",
                "dateofbirth": "2017-08-02T21:36:18.908Z"
            },
            {
                "id": "19",
                "firstname": "Breana",
                "lastname": "O'Hara",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg",
                "username": "Andres.Klein",
                "password": "gijoisvrtzGuBxr",
                "dateofbirth": "2017-10-16T22:45:17.208Z"
            },
            {
                "id": "20",
                "firstname": "Felicia",
                "lastname": "Gleason",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/lokesh_coder/128.jpg",
                "username": "Imelda_Koss93",
                "password": "_WAhk5WXzFTSxv1",
                "dateofbirth": "2017-10-21T19:47:40.424Z"
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

app.use(bodyParser.json());

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