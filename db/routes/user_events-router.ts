import { postUserEvent } from "../../controllers/postUserEvent";

export const userEventsRouter = require("express").Router();

userEventsRouter
    .route("/")
    .post(postUserEvent);