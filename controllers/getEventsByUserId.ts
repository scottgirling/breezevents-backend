import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectEventsByUserId } from "../models/selectEventsByUserId";

export const getEventsByUserId = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    selectEventsByUserId(user_id)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}