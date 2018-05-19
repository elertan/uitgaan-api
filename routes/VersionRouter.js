import BaseRouter from '../BaseRouter';
import V1MainRouter from './v1/MainRouter';

import express from 'express';

export default class VersionRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.use('/v1', new V1MainRouter().router);
    }
}