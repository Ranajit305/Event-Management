import express from 'express'
import { cancelRegistration, createEvent, getEventDetails, getEventStats, listUpcomingEvents, registerForEvent } from '../controllers/event.controller.js';
import { validateToken } from '../utils/token.js';

const eventRouter = express.Router();

eventRouter.post('/', validateToken, createEvent);
eventRouter.get('/:eventId/details', getEventDetails);
eventRouter.post('/:eventId', validateToken, registerForEvent);
eventRouter.delete('/:eventId', validateToken, cancelRegistration);
eventRouter.get('/upcoming', listUpcomingEvents);
eventRouter.get('/:eventId/stats', getEventStats);

export default eventRouter