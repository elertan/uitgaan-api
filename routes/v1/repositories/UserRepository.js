import BaseRepository from '../../../BaseRepository';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User';
import Friend_UserXUser from '../models/Friend_UserXUser';

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 50; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

export default class UserRepository extends BaseRepository {
    /**
     * Logs in a user by username and password
     * @param {string} username The username
     * @param {string} password The password
     * @returns {User|false} A user if correct, else false
     */
    static async login(username, password) {
        try {
            const user = await User.findOne({ username }).exec();
            if (await bcrypt.compare(password, user.password)) {
                return user;
            }
        } catch (err) { }
        return false;
    }

    static async register(data) {
        // User with username already exists
        const user = await User.findOne({ username: data.username }).exec();
        if (user) {
            throw new Error('Gebruikersnaam al in bezet');
        }

        const hashedPass = await bcrypt.hash(data.password, 10);
        data.password = hashedPass;
        data.accessToken = makeid();

        const userToCreate = new User(data);
        await userToCreate.save();
        return userToCreate;
    }

    static async getAll() {
        const users = await User.find().exec();
        if (!users) {
            throw new Error('Er zijn geen gebruikers gevonden');
        }

        return users;
    }

    static async getByAccessToken(token) {
        const user = await User.findOne({
            accessToken: token
        }).exec();
        return user;
    }

    static async getFriendsByUsername(username) {
        const friends_UserXUser = await Friend_UserXUser.find({ 
            $or: [ { user1: username },
                   { user2: username } ] }).exec();
        console.log(friends_UserXUser);
        if (friends_UserXUser.length === 0) {
            return [];
        }
        const friendsIds = friends_UserXUser.map(f_UxU => f_UxU.user1 !== username ? f_UxU.user1 : f_UxU.user2);
        console.log(friendsIds);
        const friends = await User.find({
            $or: friendsIds.map(id => { _id: id }) 
        }).exec();
        console.log(friends);
        return friends;
    }

    static async followUser(username1, username2) {
        const user1Friends = await this.getFriendsByUsername(username1);
        console.log(user1Friends);
        const alreadyFollowsUser2 = user1Friends.find(user => user.username === username2);
        console.log(alreadyFollowsUser2);
        if (alreadyFollowsUser2) {
            console.log('Does already follow')
            return;
        }
        const relation = new Friend_UserXUser();
        relation.user1 = username1;
        relation.user2 = username2;
        console.log(relation);
        await relation.save();
        console.log('saved');
        return await User.findOne({ username: username2 }).exec();
    }
}