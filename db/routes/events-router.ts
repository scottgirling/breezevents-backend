const getEvents = require("../../controllers/getEvents");
const getEventByEventId = require("../../controllers/getEventByEventId");
const getEventsByHostId = require("../../controllers/getEventsByHostId");
const patchEventById = require("../../controllers/patchEventById");
const patchEventDetailsById = require("../../controllers/patchEventDetailsById");
const postEvent = require("../../controllers/postEvent");
const deleteEventById = require("../../controllers/deleteEventById");

const eventsRouter = require("express").Router();

eventsRouter
    .route("/")
    .get(getEvents)
    .post(postEvent);

eventsRouter
    .route("/:event_id")
    .get(getEventByEventId)
    .patch(patchEventById)
    .delete(deleteEventById);

eventsRouter
    .route("/update/:event_id")
    .patch(patchEventDetailsById);

eventsRouter
    .route("/host/:user_id")
    .get(getEventsByHostId);

module.exports = eventsRouter;