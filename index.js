import express from 'express';
import config from './config/env';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import App from './App';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

(async () => {
    try {
        const stats = await new Promise((resolve, reject) => {
            fs.stat('.env', (err, stats) => {
                if (err) {
                    return reject(err);
                } 
                return resolve(stats);
            });
        });
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.log(err);
            process.exit(1);
        }
        console.error('.env does not exists. Creating...');
        fs.writeFileSync('.env', 
`COSMOSDB_URI=mongodb://schoolproject.documents.azure.com:10255/uitgaan?ssl=true
COSMOSDB_USER=schoolproject
COSMOSDB_PASSWORD=PASSWORD`);
        console.error('.env file created. Please edit and rerun node');
        process.exit(0);
    }
    dotenv.config();

    try {
        await mongoose.connect(process.env.COSMOSDB_URI, {
            auth: {
                user: process.env.COSMOSDB_USER,
                password: process.env.COSMOSDB_PASSWORD
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(0);
    }

    const app = express();
    app.use(bodyParser.json());
    app.use(new App().router);

    app.listen(config.env.webPort, function () {
        console.log('Listening on port: ' + config.env.webPort);
    });
})();