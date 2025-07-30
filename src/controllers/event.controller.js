import Event from '../models/event.model.js'
import { createEventSchema } from '../validators/event.validator.js';

export const createEvent = async (req, res) => {
  try {
    const validatedData = createEventSchema.parse(req.body);
    const newEvent = new Event({
      ...validatedData,
      registrations: [req.user._id],
    });
    const savedEvent = await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', eventId: savedEvent._id });
  } catch (error) {
    if (error.name === 'ZodError') {
      const firstError = error.errors?.[0]?.message || 'Invalid input';
      return res.status(400).json({ message: firstError });
    }

    console.error('Create Event Error:', error);
    res.status(500).json({ message: 'Something went wrong while creating the event' });
  }
};

export const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate('registrations', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event details fetched successfully', event });
  } catch (error) {
    console.error('Get Event Details Error:', error);
    res.status(500).json({ message: 'Something went wrong while fetching event details' });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const now = new Date();
    if (new Date(event.dateTime) < now) {
      return res.status(400).json({ message: 'Cannot register for past events' });
    }

    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.registrations.push(userId);
    await event.save();

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Register for Event Error:', error);
    res.status(500).json({ message: 'Something went wrong while registering' });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const isRegistered = event.registrations.includes(userId);
    if (!isRegistered) {
      return res.status(400).json({ message: 'You are not registered for this event' });
    }

    event.registrations = event.registrations.filter(
      (registeredUserId) => registeredUserId.toString() !== userId.toString()
    );
    await event.save();

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error('Cancel Registration Error:', error);
    res.status(500).json({ message: 'Something went wrong while cancelling registration' });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ dateTime: { $gte: now } })
      .sort({ dateTime: 1, location: 1 }).lean();

    res.status(200).json({ message: 'Upcoming events fetched successfully', events });
  } catch (error) {
    console.error('List Upcoming Events Error:', error);
    res.status(500).json({ message: 'Something went wrong while fetching events' });
  }
};

export const getEventStats = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate('registrations', '_id name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const totalRegistrations = event.registrations.length;
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentageUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2);

    res.status(200).json({
      eventId: event._id,
      title: event.title,
      totalRegistrations,
      remainingCapacity,
      percentageUsed: `${percentageUsed}%`,
    });
  } catch (error) {
    console.error('Error getting event stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};