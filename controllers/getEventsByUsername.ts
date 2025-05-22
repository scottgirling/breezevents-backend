import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEventsByUsername = require("../models/selectEventsByUsername");

const getEventsByUsername = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { username } = request.params;
    selectEventsByUsername(username)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = getEventsByUsername;