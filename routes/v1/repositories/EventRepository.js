import BaseRepository from '../../../BaseRepository';
export default class EventRepository extends BaseRepository {

    static async getEvents() {
        return [];
    }

    static async addEvent(data, username) {
        return;
    }

    static async filterEvents(name) {
        return [];
    }
}
