import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEventsByHostId = require("../models/selectEventsByHostId");

const getEventsByHostId = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    selectEventsByHostId(user_id)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = getEventsByHostId;