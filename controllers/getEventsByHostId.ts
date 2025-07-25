import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectEventsByHostId } from "../models/selectEventsByHostId";

export const getEventsByHostId = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    selectEventsByHostId(user_id)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}