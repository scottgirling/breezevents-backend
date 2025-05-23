const getVenues = require("../../controllers/getVenues");

const venuesRouter = require("express").Router();

venuesRouter
    .route("/")
    .get(getVenues);

module.exports = venuesRouter;