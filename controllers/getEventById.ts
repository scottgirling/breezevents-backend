import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEventById = require("../models/selectEventById");

const getEventById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    selectEventById(event_id)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    })
}

module.exports = getEventById;