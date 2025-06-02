const getVenues = require("../../controllers/getVenues");
const getVenueById = require("../../controllers/getVenueById");

const venuesRouter = require("express").Router();

venuesRouter
    .route("/")
    .get(getVenues);

venuesRouter
    .route("/:venue_id")
    .get(getVenueById);

module.exports = venuesRouter;