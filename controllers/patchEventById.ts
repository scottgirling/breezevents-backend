import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { updateEventById } from "../models/updateEventById";

export const patchEventById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    const { attendeeCountChange } = request.body;
    updateEventById(attendeeCountChange, event_id)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    });
}