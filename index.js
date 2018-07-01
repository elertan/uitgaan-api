import express from 'express';
import config from './config/env';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import App from './App';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Database from './Database';

(async () => {
    dotenv.config();

    try {
        await Database.connect();
        console.log('Verbonden met de database');
    } catch (err) {
        console.log(err);
        process.exit(0);
    }

    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(new App().router);

    app.listen(config.env.webPort, function () {
        console.log('Listening on port: ' + config.env.webPort);
    });
})();