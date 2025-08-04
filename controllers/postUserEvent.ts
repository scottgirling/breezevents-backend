import { NextFunction, Request, Response } from "express";
import { addUserEvent } from "../models/addUserEvent";

export const postUserEvent = (request: Request, response: Response, next: NextFunction) => {
    const { user_id, event_id } = request.body;
    addUserEvent(user_id, event_id)
    .then((userEvent: object) => {
        response.status(201).send({ userEvent });
    })
    .catch((error: Error) => {
        next(error);
    });
}