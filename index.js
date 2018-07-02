import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config/env';
import App from './App';
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

  app.listen(config.env.webPort, () => {
    console.log(`Listening on port: ${  config.env.webPort}`);
  });
})();
