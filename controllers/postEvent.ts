import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";

const addEvent = require("../models/addEvent");

const postEvent = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, is_free, price, event_image_url, is_published } = request.body;
    
    addEvent(title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, is_free, price, event_image_url, is_published)
    .then((event: object) => {
        response.status(201).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = postEvent;