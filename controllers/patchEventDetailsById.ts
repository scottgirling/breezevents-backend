import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const updateEventDetailsById = require("../models/updateEventDetailsById");

const patchEventDetailsById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    const { title, event_overview, description, start_time, end_time, timezone, venue_id, is_online, event_type, capacity, is_free, price, event_image_url, is_published } = request.body;
    updateEventDetailsById(event_id, title, event_overview, description, start_time, end_time, timezone, venue_id, is_online, event_type, capacity, is_free, price, event_image_url, is_published)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = patchEventDetailsById;