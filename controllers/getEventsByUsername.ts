import { CustomResponse } from "./interfaces/types";
const selectEventsByUsername = require("../models/selectEventsByUsername");

const getEventsByUsername = (request: any, response: CustomResponse, next: any) => {
    const { username } = request.params;
    selectEventsByUsername(username)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = getEventsByUsername;