const getUserByUsername = require("../../controllers/getUserByUsername");
const getEventsByUsername = require("../../controllers/getEventsByUsername");
const postUser = require("../../controllers/postUser");

const usersRouter = require("express").Router();

usersRouter
    .route("/")
    .post(postUser)

usersRouter
    .route("/:username")
    .get(getUserByUsername);

usersRouter
    .route("/:username/events")
    .get(getEventsByUsername);

module.exports = usersRouter;