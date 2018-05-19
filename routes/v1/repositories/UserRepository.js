import BaseRepository from '../../../BaseRepository';
import bcrypt from 'bcrypt';

export default class UserRepository extends BaseRepository {
    static async login(username, password) {
        return {
            username,
            password
        };
    }
}