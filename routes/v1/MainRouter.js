import BaseRouter from '../../BaseRouter';
import AuthRouter from './AuthRouter';
import EventsRouter from './EventsRouter';
import UserRouter from './UserRouter';
import FriendRouter from './FriendRouter';
import express from 'express';
import authMw from '../../authmw';

export default class MainRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.use('/auth', new AuthRouter().router);
        this.router.use(authMw, '/events', new EventsRouter().router);
        this.router.use(authMw, '/user', new UserRouter().router);
        this.router.use(authMw, '/friends', new FriendRouter().router);
    }
}