import express from 'express';
import BaseRouter from "../../BaseRouter";
import ApiResultGen from '../../ApiResultGen';
import UserRepository from './repositories/UserRepository';

export default class UserRouter extends BaseRouter {
  constructor() {
    super();
    this.router = new express.Router();

    this.router.get('/', UserRouter.getAll);
    this.router.get('/friends/:id', UserRouter.getFriends);
    this.router.post('/edit', UserRouter.edit);
  }

  static async getAll(req, res) {
    try {
      let users = await UserRepository.getAll(req.user.username);
      return res.send(ApiResultGen.success(users));
    } catch (err) {
      return res.send(ApiResultGen.error(err.message));
    }
  }

  static async getFriends(req, res) {
    const { id } = req.params;

    try {
      const friends = await UserRepository.getFriendsByUserId(id);
      return res.send(ApiResultGen.success(friends));
    } catch (err) {
      return res.send(ApiResultGen.error(err.message));
    }
  }

  static async edit(req, res) {
    const newUser = req.body.user;

    try {
      return res.send(ApiResultGen.success(await UserRepository.updateUser(req.user, newUser)));
    } catch (err) {
      console.log(err);
      return res.send(ApiResultGen.error(err.message));
    }
  }
}
