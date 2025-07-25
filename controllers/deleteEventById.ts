import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { removeEventById } from "../models/removeEventById";

export const deleteEventById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    removeEventById(event_id)
    .then(() => {
        response.status(204).send();
    })
    .catch((error: Error) => {
        next(error);
    });
}