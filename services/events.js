const apiResponse   = require('../config/apiresponse'),
    jwt             = require('jsonwebtoken');

class EventsService {
    constructor() {
        this.events = [];
    }

    getEvents() {
        let apiResponse = new apiResponse();

        apiResponse.responseBody = this.events;

        return apiResponse;
    }

    registerFakeEvents(events) {
        for(let e = 0; e < events.length; e ++) {
            this.events.push(events[e]);
        }
    }
}

module.exports = new EventsService();