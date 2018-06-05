import BaseRouter from '../../BaseRouter';
import AuthRouter from './AuthRouter';
import EventsRouter from './EventsRouter';
import UserRouter from './UserRouter';
import express from 'express';

export default class MainRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.use('/auth', new AuthRouter().router);
        this.router.use('/events', new EventsRouter().router);
        this.router.use('/user', new UserRouter().router);
    }
}