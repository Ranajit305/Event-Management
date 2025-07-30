import express from 'express'
import { cancelRegistration, createEvent, getAllEvents, getEventStats, listUpcomingEvents, registerForEvent } from '../controllers/event.controller.js';
import { validateToken } from '../utils/token.js';

const eventRouter = express.Router();

eventRouter.post('/', validateToken, createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.post('/:eventId', validateToken, registerForEvent);
eventRouter.delete('/:eventId', validateToken, cancelRegistration);
eventRouter.get('/upcoming', listUpcomingEvents);
eventRouter.get('/:eventId', getEventStats);

export default eventRouter