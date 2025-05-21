import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEvents = require("../models/selectEvents");

const getEvents = (request: CustomRequest, response: CustomResponse, next: any) => {
    const { sort_by, order, tag, is_online, is_free } = request.query;
    selectEvents(sort_by, order, tag, is_online, is_free)
    .then((events: Array<object> ) => {
        response.status(200).send({ events });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = getEvents;