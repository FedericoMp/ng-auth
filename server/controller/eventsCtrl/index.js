const {getEvents} = require('./getEvents');
const {getEvent} = require('./getEvent');
const {createEvent} = require('./createEvent');
const {updateEvent} = require('./updateEvent');
const {deleteEvent} = require('./deleteEvent');

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};