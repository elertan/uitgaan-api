import BaseRouter from "../../BaseRouter";
import ApiResultGen from '../../ApiResultGen';
import express from 'express';
import FriendRepository from "./repositories/FriendRepository";
import UserRepository from './repositories/UserRepository';

export default class FriendRouter extends BaseRouter {
  constructor() {
    super();
    this.router = new express.Router();

    this.router.get('/', this.getFriends);
    this.router.post('/follow', this.addFriend);
    this.router.delete('/', this.deleteFriend);
  }

  async deleteFriend(req, res) {
      const friend = req.body;

      try {
          const result = await UserRepository.removeFriend(friend);
          return res.send(ApiResultGen.success(result));
      } catch (err) {
          return res.send(ApiResultGen.error(err.message));
      }
  }

  async addFriend(req, res) {
    const { username } = req.body;

    try {
        const result = await UserRepository.followUser(req.user.username, username);
        if (result) {
            return res.send(ApiResultGen.success(result));
        }
        return res.send(ApiResultGen.error('Je volgt deze gebruiker al'));
    } catch (err) {
        return res.send(ApiResultGen.error(err.message));
    }
  }

  async getFriends(req, res) {
    try {
        let friends = await UserRepository.getFriendsByUsername(req.user.username);

        return res.send(ApiResultGen.success(friends));
    } catch (err) {
        res.send(ApiResultGen.error(err.message));
    }
  }
}