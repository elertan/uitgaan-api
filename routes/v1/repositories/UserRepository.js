import bcrypt from 'bcrypt';
import BaseRepository from '../../../BaseRepository';
import Database from '../../../Database';

function makeid() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 50; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

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
      const result = await Database.prepQuery(`SELECT 
        username,
        password,
        firstname,
        lastname,
        date_of_birth AS dateOfBirth,
        avatar_image AS avatar,
        bio,
        access_token AS accessToken
      FROM User WHERE username = ? LIMIT 1`, [username]);
      if (result.length === 0) {
        // User was not found
        return false;
      }
      const user = result[0];
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  static async register(data) {
    // User with username already exists
    const result = await Database.prepQuery('SELECT * FROM User WHERE username = ? LIMIT 1', [data.username]);
    if (result.length === 1) {
      // User was found
      throw new Error('Gebruikersnaam al in bezet');
    }
    const hashedPass = await bcrypt.hash(data.password, 10);
    data.password = hashedPass;
    data.accessToken = makeid();

    const result2 = await Database.prepQuery(`
      INSERT INTO User
      (username, password, firstname, lastname, date_of_birth, avatar_image, bio, access_token)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.username,
      data.password,
      data.firstname,
      data.lastname,
      data.dateOfBirth,
      data.avatar,
      data.bio,
      data.accessToken,
    ]);

    const id = result2.insertId;
    const userResult = await Database.prepQuery(`
      SELECT
        username,
        password,
        firstname,
        lastname,
        date_of_birth AS dateOfBirth,
        avatar_image AS avatar,
        bio,
        access_token AS accessToken
      FROM User
      WHERE id = ?
      LIMIT 1
    `, [id]);

    return userResult[0];
  }

  static async getAll(username) {

    return [];
  }

  static async getByAccessToken(token) {
    return null;
  }

  static async getFriendsByUsername(username) {
    return [];
  }

  static async followUser(username1, username2) {
    return;
  }

  static async updateUser(currentUser, newUser) {
    return;
  }
}
