import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { addEventTag } from "../models/addEventTag";

export const postEventTag = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { event_id, tag_id } = request.body;
    addEventTag(event_id, tag_id)
    .then((eventTag: object) => {
        response.status(201).send({ eventTag });
    })
    .catch((error: object) => {
        next(error);
    });
}