import { NextFunction, Request, Response } from "express";
import { selectEventByEventId } from "../models/selectEventByEventId";

export const getEventByEventId = (request: Request, response: Response, next: NextFunction) => {
    const { event_id } = request.params;
    selectEventByEventId(event_id)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    })
}