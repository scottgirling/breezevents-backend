import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const removeEventById = require("../models/removeEventById");

const deleteEventById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    removeEventById(event_id)
    .then(() => {
        response.status(204).send();
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = deleteEventById;