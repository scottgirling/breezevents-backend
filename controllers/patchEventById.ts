import { CustomRequest, CustomResponse } from "./interfaces/types";
const updateEventById = require("../models/updateEventById");

const patchEventById = (request: CustomRequest, response: CustomResponse, next: any) => {
    const { event_id } = request.params;
    const { attendeeCountChange } = request.body;
    updateEventById(attendeeCountChange, event_id)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = patchEventById;