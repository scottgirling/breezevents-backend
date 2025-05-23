const getEvents = require("../../controllers/getEvents");
const getEventById = require("../../controllers/getEventById");
const getEventsByHostUsername = require("../../controllers/getEventsByHostUsername");
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
    .get(getEventById)
    .patch(patchEventById)
    .delete(deleteEventById);

eventsRouter
    .route("/update/:event_id")
    .patch(patchEventDetailsById);

eventsRouter
    .route("/host/:username")
    .get(getEventsByHostUsername);

module.exports = eventsRouter;