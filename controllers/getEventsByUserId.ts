import { NextFunction, Request, Response } from "express";
import { selectEventsByUserId } from "../models/selectEventsByUserId";

export const getEventsByUserId = (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.params;
    selectEventsByUserId(user_id)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}