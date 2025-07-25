import { getUserById } from "../../controllers/getUserById";
import { getEventsByUserId } from "../../controllers/getEventsByUserId";
import { patchUserById } from "../../controllers/patchUserById";
import { postUser } from "../../controllers/postUser";

export const usersRouter = require("express").Router();

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