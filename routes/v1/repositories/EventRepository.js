import BaseRepository from '../../../BaseRepository';
import Event from "../models/Event";

export default class EventRepository extends BaseRepository {

    static async getEvents() {
        try {
            const events = await Event.find({}).sort({ till: 1 }).exec();
            return events;
        } catch (err) { }

        return events;
    }

    static async addEvent(data) {
        const event = await Event.findOne({ name: data.name }).exec();
        if (event) {
            throw new Error('Dit event bestaat al.');
        }

        const eventToCreate = new Event(data);
        await eventToCreate.save();
        return eventToCreate;
    }

    static async filterEvents(name) {
        const event = await Event.find({ "name": { "$regex": name, "$options": "i" }}).exec();
        if (!event) {
            throw new Error('Geen evenementen gevonden.');
        }

        return event;
    }
}