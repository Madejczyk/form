const Event = require('../models/event-model');

const createEvent = (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Event',
    });
  }

  const Event = new Event(body);

  if (!Event) {
    return res.status(400).json({ success: false, error: 'Event not created' });
  }

  Event
    .save()
    .then(() => res.status(201).json({
      success: true,
      id: Event._id,
      message: 'Event created',
    }))
    .catch((error) => res.status(400).json({
      error,
      message: 'Event not created',
    }));
};

const updateEvent = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Event.findOne({ _id: req.params.id }, (err, Event) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Event not found',
      });
    }
    Event.firstName = body.firstName;
    Event.lastName = body.lastName;
    Event.email = body.email;
    Event.eventTimestamp = body.eventTimestamp;
    Event
      .save()
      .then(() => res.status(200).json({
        success: true,
        id: Event._id,
        message: 'Event updated',
      }))
      .catch((error) => res.status(404).json({
        error,
        message: 'Event not updated',
      }));
  });
};

const deleteEvent = async (req, res) => {
  await Event.findOneAndDelete({ _id: req.params.id }, (err, Event) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!Event) {
      return res
        .status(404)
        .json({ success: false, error: 'Event not found' });
    }

    return res.status(200).json({ success: true, data: Event });
  }).catch((err) => console.log(err));
};

const getEventById = async (req, res) => {
  await Event.findOne({ _id: req.params.id }, (err, Event) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!Event) {
      return res
        .status(404)
        .json({ success: false, error: 'Event not found' });
    }
    return res.status(200).json({ success: true, data: Event });
  }).catch((err) => console.log(err));
};

const getEvents = async (req, res) => {
  await Event.find({}, (err, Events) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!Events.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Event not found' });
    }
    return res.status(200).json({ success: true, data: Events });
  }).catch((err) => console.log(err));
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
};
