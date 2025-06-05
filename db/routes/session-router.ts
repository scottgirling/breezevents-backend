const getSession = require("../../controllers/getSession");

const sessionRouter = require("express").Router();

sessionRouter
    .route("/")
    .get(getSession);

module.exports = sessionRouter;