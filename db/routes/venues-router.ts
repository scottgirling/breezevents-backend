import { getVenues } from "../../controllers/getVenues";
import { getVenueById } from "../../controllers/getVenueById";

export const venuesRouter = require("express").Router();

venuesRouter
    .route("/")
    .get(getVenues);

venuesRouter
    .route("/:venue_id")
    .get(getVenueById);