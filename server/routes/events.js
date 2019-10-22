const express = require('express');
const router = express.Router();

// const {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require('../controller/eventsCtrl');
const {getEvents} = require('../controller/eventsCtrl/getEvents');
const {getEvent} = require('../controller/eventsCtrl/getEvent');
const {createEvent} = require('../controller/eventsCtrl/createEvent');
const {updateEvent} = require('../controller/eventsCtrl/updateEvent');
const {deleteEvent} = require('../controller/eventsCtrl/deleteEvent');

router.get('/events', getEvents);
router.get('/event/:id', getEvent);
router.post('/event/create', createEvent);
router.put('/event/update/:id', updateEvent);
router.delete('/event/delete/:id', deleteEvent);

module.exports = router;