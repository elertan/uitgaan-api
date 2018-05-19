import BaseRouter from '../../BaseRouter';
import ApiResultGen from '../../ApiResultGen';
import {
    check
} from 'express-validator/check';
import express from 'express';
import moment from 'moment';

export default class EventsRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();


    }
}