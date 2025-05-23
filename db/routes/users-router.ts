const getUserByUsername = require("../../controllers/getUserByUsername");
const getEventsByUsername = require("../../controllers/getEventsByUsername");

const usersRouter = require("express").Router();

usersRouter
    .route("/:username")
    .get(getUserByUsername);

usersRouter
    .route("/:username/events")
    .get(getEventsByUsername);

module.exports = usersRouter;