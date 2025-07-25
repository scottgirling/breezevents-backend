import { getTags } from "../../controllers/getTags";

export const tagsRouter = require("express").Router();

tagsRouter
    .route("/")
    .get(getTags);