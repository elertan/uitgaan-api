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

    for (let i = 0; i < eventsResults.length; i++) {
      const peopleThatComeResults = await Database.prepQuery(`
        SELECT
          username,
          firstname,
          lastname,
          avatar_image AS avatar,
          bio
        FROM User
        WHERE
          0 < (SELECT COUNT(*)
          FROM EventGoing_UserXEvent
          WHERE EventGoing_UserXEvent.user_id = User.id AND
          EventGoing_UserXEvent.event_id = ?)
      `, [eventsResults[i].id]);
      eventsResults[i].peopleGoing = peopleThatComeResults;
    }
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
      WHERE
        WHERE Event.name LIKE ? AND
        User.id = ? OR
        NOT (Event.private) OR
        (SELECT COUNT(*) FROM Follow_UserXUser WHERE user1_id = ? AND user2_id = User.id) > 0 
    `, [name, id, id]);
    return eventsResults;
  }

  static async goToEvent(userId, eventId) {
    await Database.prepQuery(`
      INSERT INTO EventGoing_UserXEvent
      (user_id, event_id)
      VALUES
      (?, ?)
    `, [userId, eventId]);
  }
}