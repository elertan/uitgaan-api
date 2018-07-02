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
                .exists().withMessage('Evenement moet een discription hebben.')
                .isString().withMessage('Evenement moet een discription hebben.'),
            check('till')
                .exists().withMessage('Evenement moet einddatum hebben.'),
            check('from')
                .exists().withMessage('Evenement moet een begindatum hebben.'),
            check('image')
                .exists().withMessage('Evenement moet een plaatje hebben.'),
            BaseRouter.routeParamsMw
        ], this.addEvent);
        
        this.router.post('/filter', [
            check('name')
                .exists().withMessage('Evenement moet een naam hebben.')
                .isString().withMessage('Evenement naam moet een string zijn'),
            BaseRouter.routeParamsMw
        ], this.filterEvent);

        this.router.post('/go-to', [
            check('eventId')
                .exists()
                .isNumeric(),
            BaseRouter.routeParamsMw
        ], this.goTo);
    }

    async getEvents(req, res) {
        const result = await EventRepository.getEvents(req.user.username);

        if (!result) {
            return res.send(ApiResultGen.error('Kan geen evenementen ophalen.'));
        }
        return res.send(ApiResultGen.success(result));
    }

    async addEvent(req, res) {
        const event = req.body;

        try {
            const result = await EventRepository.addEvent(event, req.user.username);
            return res.send(ApiResultGen.success(result));
        } catch (err) {
            return res.send(ApiResultGen.error(err.message));
        }
    }

    async filterEvent(req, res) {
        const name = req.body.name;

        try {
            const result = await EventRepository.filterEvents(name);
            return res.send(ApiResultGen.success(result));
        } catch (err) {
            return res.send(ApiResultGen.error(err.message));
        }
    }

    async goTo(req, res) {
        const userId = req.user.id;
        const eventId = req.body.eventId;

        try {
            const result = await EventRepository.goToEvent(userId, eventId);
            return res.send(ApiResultGen.success(eventId));
        } catch (err) {
            return res.send(ApiResultGen.error(err.message));
        }
    }
}