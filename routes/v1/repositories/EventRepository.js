import BaseRepository from '../../../BaseRepository';
import Event from "../models/Event";

import UserRepository from '../repositories/UserRepository';

export default class EventRepository extends BaseRepository {

    static async getEvents() {
        try {
            const users = await UserRepository.getAll();
            const events = await Event.find({}).sort({ till: 1 }).exec();
            const eventsWithUsers = events.map(event => Object.assign(event, { user: users.find(user => user.username === event.username) }));
            return eventsWithUsers;
        } catch (err) { }
        return events;
    }

    static async addEvent(data,username) {
        const event = await Event.findOne({ name: data.name }).exec();
        if (event) {
            throw new Error('Dit event bestaat al.');
        }
        const eventToCreate = new Event(Object.assign(data,{username}));
        await eventToCreate.save();
        return eventToCreate;
    }

    static async filterEvents(name) {
        const events = await Event.find({ "name": { "$regex": name, "$options": "i" }}).exec();
        return eventsWithUsers;
        if (!events) {
            throw new Error('Geen evenementen gevonden.');
        }
        const users = await UserRepository.getAll();
        const eventsWithUsers = events.map(event => Object.assign(event, { user: users.find(user => user.username === event.username) }));
        
        return eventsWithUsers;
    }
}