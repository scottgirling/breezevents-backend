import { postEventTag } from "../../controllers/postEventTag";

export const eventTagsRouter = require("express").Router();

eventTagsRouter
    .route("/")
    .post(postEventTag);