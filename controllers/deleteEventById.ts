import { NextFunction, Request, Response } from "express";
import { removeEventById } from "../models/removeEventById";

export const deleteEventById = (request: Request, response: Response, next: NextFunction) => {
    const { event_id } = request.params;
    removeEventById(event_id)
    .then(() => {
        response.status(204).send();
    })
    .catch((error: Error) => {
        next(error);
    });
}