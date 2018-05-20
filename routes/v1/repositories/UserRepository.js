import BaseRepository from '../../../BaseRepository';
// import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User';

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
        const hashedPass = await bcrypt.hash(data.password, 10);
        data.password = hashedPass;

        const userToCreate = new User(data);
        await userToCreate.save();
        return userToCreate;
    }
}