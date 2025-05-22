import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectEventsByHostUsername = require("../models/selectEventsByHostUsername");

const getEventsByHostUsername = (request: CustomRequest, response: CustomResponse, next: any) => {
    const { username } = request.params;
    selectEventsByHostUsername(username)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = getEventsByHostUsername;