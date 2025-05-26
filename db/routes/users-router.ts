const getUserById = require("../../controllers/getUserById");
const getEventsByUserId = require("../../controllers/getEventsByUserId");
const patchUserById = require("../../controllers/patchUserById");
const postUser = require("../../controllers/postUser");

const usersRouter = require("express").Router();

usersRouter
    .route("/")
    .post(postUser)

usersRouter
    .route("/:user_id")
    .get(getUserById)
    .patch(patchUserById);

usersRouter
    .route("/:user_id/events")
    .get(getEventsByUserId);

module.exports = usersRouter;