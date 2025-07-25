const getSession = require("../../controllers/getSession");

export const sessionRouter = require("express").Router();

sessionRouter
    .route("/")
    .get(getSession);