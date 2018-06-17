import BaseRouter from "../../BaseRouter";
import ApiResultGen from '../../ApiResultGen';
import express from 'express';
import FriendRepository from "./repositories/FriendRepository";

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
        return res.send(ApiResultGen.success(result));
    } catch (err) {
        return res.send(ApiResultGen.error(err.message));
    }
  }

  async getFriends(req, res) {
    try {
        let providedUser = req.query.username;
        let friends = await FriendRepository.getAll();

        var results = [];

        for (var friend in friends) {
            if (friend.username == providedUser) {
                results.push(friend);
            }
        }

        return results;
    } catch (err) {
        res.send(ApiResultGen.error(err.message));
    }
  }
}