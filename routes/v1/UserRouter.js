import express from 'express';
import BaseRouter from "../../BaseRouter";
import ApiResultGen from '../../ApiResultGen';
import UserRepository from './repositories/UserRepository';

export default class UserRouter extends BaseRouter {
  constructor() {
    super();
    this.router = new express.Router();

    this.router.get('/', this.getAll);
    this.router.get('/friends/:id', this.getFriends);
    this.router.post('/edit', this.edit);
  }

  async getAll(req, res) {
    try {
      let users = await UserRepository.getAll(req.user.username);
      return res.send(ApiResultGen.success(users));
    } catch (err) {
      res.send(ApiResultGen.error(err.message));
    }
  }

  async getFriends(req, res) {
    const id = req.params.id;
    try {
      const friends = await UserRepository.getFriendsByUserId(id);
      return res.send(ApiResultGen.success(friends));
    } catch (err) {
      res.send(ApiResultGen.error(err.message));
    }
  }

  async edit(req, res) {
    const newUser = req.body.user;
    try {
      return res.send(ApiResultGen.success(await UserRepository.updateUser(req.user, newUser)));
    } catch (err) {
      console.log(err);
      return res.send(ApiResultGen.error(err.message));
    }
  }
}
