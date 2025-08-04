import { NextFunction, Request, Response } from "express";
import { updateEventById } from "../models/updateEventById";

export const patchEventById = (request: Request, response: Response, next: NextFunction) => {
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