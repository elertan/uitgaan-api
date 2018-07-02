import BaseRepository from '../../../BaseRepository';
import Database from '../../../Database';
export default class EventRepository extends BaseRepository {

  static async getEvents(username) {
    const idResult = await Database.prepQuery(`SELECT id FROM User WHERE username = ?`, [username]);
    const id = idResult[0].id;

    const eventsResults = await Database.prepQuery(`
      SELECT 
          Event.*,
          User.avatar_image AS avatar,
          User.username
      FROM Event
      INNER JOIN User ON User.id = Event.user_id
      WHERE
        User.id = ? OR
        NOT (Event.private) OR
        (SELECT COUNT(*) FROM Follow_UserXUser WHERE user1_id = ? AND user2_id = User.id) > 0 
    `, [id, id]);
    return eventsResults;
  }

  static async addEvent(data, username) {
    const insertResult = await Database.prepQuery(`
      INSERT INTO Event 
        (name, description, price, till, fromDate, image, private, user_id)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM User WHERE username = ?))
    `, [
      data.name,
      data.description,
      String(data.price),
      String(data.till),
      String(data.from),
      data.image,
      data.privateEvent,
      username,
    ]);
    const eventResult = await Database.prepQuery(`
      SELECT 
        Event.*,
        User.avatar_image AS avatar,
        User.username
      FROM Event
      INNER JOIN User ON User.id = Event.user_id
      WHERE Event.id = ?
    `, [insertResult.insertId]);

    return eventResult[0];
  }

  static async filterEvents(name) {
    const eventsResults = await Database.prepQuery(`
      SELECT 
          Event.*,
          User.avatar_image AS avatar,
          User.username
      FROM Event
      INNER JOIN User ON User.id = Event.user_id
      WHERE Event.name LIKE ?
    `, [name]);
    return eventsResults;
  }
}