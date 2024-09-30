import Event from "../models/Event.js";
import Artist from "../models/Artist.js";
import { createError } from "../utils/error.js";

export const createEvent = async (req, res, next) => {
  const artistId = req.params.artistid;
  const newEvent = new Event(req.body);

  try {
    const savedEvent = await newEvent.save();
    try {
      await Artist.findByIdAndUpdate(artistId, {
        $push: { events : savedEvent._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updateEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEventAvailability = async (req, res, next) => {
  try {
    await Event.updateOne(
      { "ticket._id": req.params.id },
      {
        $push: {
          "ticket.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Event status has been updated.");
  } catch (err) {
    next(err);
  }
};


export const deleteEvent = async (req, res, next) => {
  const artistId = req.params.artistid;
  try {
    await Event.findByIdAndDelete(req.params.id);
    try {
      await Artist.findByIdAndUpdate(artistId, {
        $pull: { events : req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Event has been deleted.");
  } catch (err) {
    next(err);
  }
};



export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};




