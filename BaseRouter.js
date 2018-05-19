import express from 'express';
import ApiResultGen from './ApiResultGen';
import {
    validationResult
} from 'express-validator/check';

export default class BaseRouter {
    static routeParamsMw(req, res, next) {
        const ve = validationResult(req);
        if (!ve.isEmpty()) {
            return res.send(ApiResultGen.badRequest(ve));
        }
        next();
    };

    contructor() {
        this.router = express.Router();
    }
}