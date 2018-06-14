import BaseRepository from '../../../BaseRepository';
// import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Friend from '../models/Friend';

export default class FriendRepository extends BaseRepository {
    static async addFriend(data) {
        const friend = await Friend.findOne({ username: data.username }).exec();
        if (friend) {
            throw new Error('Vriend is reeds toegevoegd');
        }

        const friendToCreate = new Friend(data);
        await friendToCreate.save();
        return friendToCreate;
    }

    static async getAll() {
        const friends = await Friend.find().exec();
        if (!friends) {
            throw new Error('Er zijn geen gebruikers gevonden');
        }

        return friends;
    }
}