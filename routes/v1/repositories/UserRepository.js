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
      (username, password, firstname, lastname, avatar_image, bio, access_token)
      VALUES
      (?, ?, ?, ?, ?, ?, ?)
    `, [
      data.username,
      data.password,
      data.firstname,
      data.lastname,
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

    const idResult = await Database.prepQuery(`SELECT id FROM User WHERE username = ?`, [username]);
    const id = idResult[0].id;

    const usersResult = await Database.prepQuery(`
      SELECT
        username,
        password,
        firstname,
        lastname,
        avatar_image AS avatar,
        bio,
        access_token AS accessToken
      FROM User
      WHERE 
        User.id != ? AND
        (SELECT COUNT(*) FROM Follow_UserXUser WHERE user1_id = ? AND user2_id = User.id) = 0
    `, [id, id]);
    return usersResult;
  }

  static async getByAccessToken(token) {
    const userResult = await Database.prepQuery(`
      SELECT
        id,
        username,
        password,
        firstname,
        lastname,
        avatar_image AS avatar,
        bio,
        access_token AS accessToken
      FROM User
      WHERE User.access_token = ?
    `, [token]);
    return userResult[0];
  }

  static async getFriendsByUsername(username) {
    const usersResult = await Database.prepQuery(`
      SELECT
        User.username,
        User.password,
        User.firstname,
        User.lastname,
        User.avatar_image AS avatar,
        User.bio,
        User.access_token AS accessToken
      FROM Follow_UserXUser
      INNER JOIN User ON user2_id = User.id
      WHERE user1_id = (SELECT id FROM User WHERE username = ?)
    `, [username]);
    return usersResult;
  }

  static async followUser(username1, username2) {
    const insertResult = await Database.prepQuery(`
      INSERT INTO Follow_UserXUser
      (user1_id, user2_id)
      VALUES
      ((SELECT id FROM User WHERE username = ?), (SELECT id FROM User WHERE username = ?))
    `, [username1, username2]);
    const result = await Database.prepQuery(`
      SELECT
        User.username,
        User.password,
        User.firstname,
        User.lastname,
        User.avatar_image AS avatar,
        User.bio,
        User.access_token AS accessToken
      FROM Follow_UserXUser
      INNER JOIN User ON Follow_UserXUser.user2_id = User.id
      WHERE Follow_UserXUser.id = ?
    `, [insertResult.insertId]);
    return result[0];
  }

  static async updateUser(currentUser, newUser) {
    await Database.prepQuery(`
      UPDATE User
      SET
        firstname = ?,
        lastname = ?,
        avatar_image = ?,
        bio = ?
      WHERE User.username = ?
    `, [
      newUser.firstname,
      newUser.lastname,
      newUser.avatar,
      newUser.bio,
      currentUser.username,
    ]);
    const userResult = await Database.prepQuery(`
      SELECT
        username,
        password,
        firstname,
        lastname,
        avatar_image AS avatar,
        bio,
        access_token AS accessToken
      FROM User
      WHERE User.username = ?
    `, [currentUser.username]);
    return userResult[0];
  }
}
