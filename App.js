import BaseRouter from './BaseRouter';
import ApiResultGen from './ApiResultGen';

import express from 'express';
import VersionRouter from './routes/VersionRouter';

export default class App extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.use('/api', new VersionRouter().router);
        this.router.use('*', function (req, res) {
            res.status(404);
            return ApiResultGen.error('Route does not exist');
        });
    }
}