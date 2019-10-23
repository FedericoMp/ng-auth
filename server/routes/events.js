const express = require('express');
const router = express.Router();

const {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require('../controller/eventsCtrl');

router.get('/events', getEvents);
router.get('/event/:id', getEvent);
router.post('/event/create', createEvent);
router.put('/event/update/:id', updateEvent);
router.delete('/event/delete/:id', deleteEvent);

module.exports = router;