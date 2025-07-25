import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectEventByEventId } from "../models/selectEventByEventId";

export const getEventByEventId = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id } = request.params;
    selectEventByEventId(event_id)
    .then((event: object) => {
        response.status(200).send({ event });
    })
    .catch((error: Error) => {
        next(error);
    })
}