import BaseRouter from '../../BaseRouter';
import UserRepository from './repositories/UserRepository';
import ApiResultGen from '../../ApiResultGen';
import {
    check
} from 'express-validator/check';
import express from 'express';
import moment from 'moment';
import mongoose from 'mongoose';

export default class AuthRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.post('/login', [
            check('username')
                .exists().withMessage('Gebruikersnaam is een verplicht veld.')
                .isString().withMessage('Gebruikersnaam moet een string zijn')
                .isLength({ min: 5 }).withMessage('Gebruikersnaam moet minimaal 5 karakters lang zijn'),
            check('password')
                .exists().withMessage('Wachtwoord is een verplicht veld')
                .isString().withMessage('Wachtwoord moet een string zijn')
                .isLength({ min: 5 }).withMessage('Wachtwoord moet minimaal 5 karakters lang zijn'),
            BaseRouter.routeParamsMw
        ], this.login);

        this.router.post('/register', [
            check('username').isString().isLength({ min: 3, max: 30 }),
            check('password').isString().isLength({ min: 5, max: 30 }),
            check('firstname').isString().isLength({ min: 1, max: 50 }),
            check('lastname').isString().isLength({ min: 1, max: 50 }),
            check('bio').isString(),
            check('avatar').isString(),
            // check('dateofbirth').isBefore(moment().subtract(18, 'years').toString()).withMessage('Je moet ouder dan 18 jaar zijn'),
            check('dateOfBirth').isString().withMessage('Geboortedatum is een verplichte datum'),
            BaseRouter.routeParamsMw
        ], this.register);
    }

    async login(req, res) {
        const user = req.body;
        const result = await UserRepository.login(user.username, user.password);
        if (!result) {
            return res.send(ApiResultGen.error('Gebruikersnaam of wachtwoord is incorrect.'));
        }
        return res.send(ApiResultGen.success(result));
    }

    async register(req, res) {
        const user = req.body;
        try {
            const result = await UserRepository.register(user);
            return res.send(ApiResultGen.success(result));
        } catch (err) {
            return res.send(ApiResultGen.error(err.message));
        }
    }
}