import { NextFunction, Request, Response } from "express";
import { selectEventsByHostId } from "../models/selectEventsByHostId";

export const getEventsByHostId = (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.params;
    selectEventsByHostId(user_id)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}