import BaseRouter from '../../BaseRouter';
import UserRepository from './repositories/UserRepository';
import ApiResultGen from '../../ApiResultGen';
import {
    check
} from 'express-validator/check';
import express from 'express';
import moment from 'moment';


export default class AuthRouter extends BaseRouter {
    constructor() {
        super();
        this.router = express.Router();

        this.router.post('/login', [
            check('username')
                .exists().withMessage('Username is een verplicht veld.')
                .isString().withMessage('Username moet een string zijn')
                .isLength({ min: 5 }).withMessage('Username moet minimaal 5 karakters lang zijn'),
            check('password')
                .exists().withMessage('Password is een verplicht veld')
                .isString().withMessage('Password moet een string zijn')
                .isLength({ min: 5 }).withMessage('Wachtwoord moet minimaal 5 karakters lang zijn'),
            BaseRouter.routeParamsMw
        ], this.login);

        this.router.post('/register', [
            check('username').isString().isLength({ min: 3, max: 30 }),
            check('password').isString().isLength({ min: 5, max: 30 }),
            check('firstname').isString().isLength({ min: 1, max: 50 }),
            check('lastname').isString().isLength({ min: 1, max: 50 }),
            // check('dateofbirth').isBefore(moment().subtract(18, 'years').toString()).withMessage('Je moet ouder dan 18 jaar zijn'),
            check('dateofbirth').isString().withMessage('Geboortedatum is een verplichte datum'),
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
        return res.send(ApiResultGen.success(user));
    }
}