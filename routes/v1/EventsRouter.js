import BaseRouter from '../../BaseRouter';
import ApiResultGen from '../../ApiResultGen';
import express from 'express';
import EventRepository from "./repositories/EventRepository";
import {check} from "express-validator/check/index";

export default class EventsRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.get('/all', this.getEvents);

        this.router.post('/add', [
            check('name')
                .exists().withMessage('Evenement moet een naam hebben.')
                .isString().withMessage('Evenement naam moet een string zijn'),
            check('description')
                .exists().withMessage('Evenement moet een naam hebben.')
                .isString().withMessage('Evenement moet een naam hebben.'),
            check('till')
                .exists().withMessage('Evenement moet einddatum hebben.'),
            check('from')
                .exists().withMessage('Evenement moet een begindatum hebben.'),
            BaseRouter.routeParamsMw
        ], this.addEvent);
    }

    async getEvents(req, res) {
        const result = await EventRepository.getEvents();

        if (!result) {
            return res.send(ApiResultGen.error('Kan geen evenementen ophalen.'));
        }
        return res.send(ApiResultGen.success(result));
    }

    async addEvent(req, res) {
        const event = req.body;

        try {
            const result = await EventRepository.addEvent(event);
            return res.send(ApiResultGen.success(result));
        } catch (err) {
            return res.send(ApiResultGen.error(err.message));
        }
    }
}