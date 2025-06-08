const postEventTag = require("../../controllers/postEventTag");

const eventTagsRouter = require("express").Router();

eventTagsRouter
    .route("/")
    .post(postEventTag);

module.exports = eventTagsRouter;