import BaseRouter from "../../BaseRouter";
import ApiResultGen from '../../ApiResultGen';
import express from 'express';
import UserRepository from "./repositories/UserRepository";

export default class UserRouter extends BaseRouter {
  constructor() {
    super();
    this.router = new express.Router();

    this.router.get('/', this.getAll);
    this.router.get('/friends/:id', this.getFriends);
  }

  async getAll(req, res) {
    try {
      let users = await UserRepository.getAll();
      users = users.map(user => { 
        const newUser = Object.assign({}, user._doc);
        newUser.password = undefined;
        return newUser;
      });
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
}