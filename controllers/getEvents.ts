import { CustomResponse } from "./interfaces/types";
const selectEvents = require("../models/selectEvents");

const getEvents = (request: any, response: CustomResponse, next: any) => {
    selectEvents()
    .then((events: Array<object> ) => {
        response.status(200).send({ events });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = getEvents;