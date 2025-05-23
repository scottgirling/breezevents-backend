const postUserEvent = require("../../controllers/postUserEvent");

const userEventsRouter = require("express").Router();

userEventsRouter
    .route("/")
    .post(postUserEvent);

module.exports = userEventsRouter;