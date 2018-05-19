import BaseRouter from '../../BaseRouter';
import AuthRouter from './AuthRouter';
import express from 'express';

export default class MainRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.use('/auth', new AuthRouter().router);
    }
}