import BaseRepository from '../../../BaseRepository';
import Database from '../../../Database';
export default class EventRepository extends BaseRepository {

  static async getEvents() {
    const eventsResults = await Database.prepQuery(`
      SELECT 
          Event.*,
          User.avatar_image AS avatar,
          User.username
      FROM Event
      INNER JOIN User ON User.id = Event.user_id
    `);
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