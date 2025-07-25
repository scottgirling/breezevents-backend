import { getEvents } from "../../controllers/getEvents";
import { getEventByEventId } from "../../controllers/getEventByEventId";
import { getEventsByHostId } from "../../controllers/getEventsByHostId";
import { patchEventById } from "../../controllers/patchEventById";
import { patchEventDetailsById } from "../../controllers/patchEventDetailsById";
import { postEvent } from "../../controllers/postEvent";
import { deleteEventById } from "../../controllers/deleteEventById";

export const eventsRouter = require("express").Router();

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