import express from 'express';
import config from './config/env';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import App from './App';

// events = [
//     {
//         id: 0,
//         name: 'Beurs Studentenavond',
//         description: 'Voor alle paupers!',
//         price: 2500,
//         date: '23-05-2018',
//         image: 'https://sfeerhoreca.smugmug.com/CafedeBeurs/Zaterdag-10-mei-2014-Cafe/i-KTBNS3P/0/f4a4e608/M/20140510_Sila_Beurs-14-M.jpg'
//     },
//     {
//         id: 1,
//         name: 'Snollebollekes Skihut',
//         description: 'Lekker fout!',
//         price: 1000,
//         date: '28-05-2018',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rob_kemps_zanger_snollebollekes_-1479113607.jpeg/266px-Rob_kemps_zanger_snollebollekes_-1479113607.jpeg'
//     },
//     {
//         id: 2,
//         name: 'Villa Thalia VIP',
//         description: 'Be a special guest with this VIP ticket!',
//         price: 5000,
//         date: '29-05-2018',
//         image: 'http://www.clubvillathalia.nl/wp-content/uploads/sites/16/2015/01/Viptable-1-300x200.jpg'
//     },
// ];

const app = express();
app.use(bodyParser.json());
app.use(new App().router);

app.listen(config.env.webPort, function () {
    console.log('Listening on port: ' + config.env.webPort);
});