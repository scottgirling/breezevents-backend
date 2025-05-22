import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEvents = require("../models/selectEvents");

const getEvents = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { sort_by, order, tag, is_online, is_free, limit, p } = request.query;
    selectEvents(sort_by, order, tag, is_online, is_free, limit, p)
    .then((events: Array<object> ) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = getEvents;