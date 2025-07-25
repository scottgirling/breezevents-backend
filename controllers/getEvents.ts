import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { checkTagExists } from "../models/utils/checkTagExists";
import { selectEvents } from "../models/selectEvents";

export const getEvents = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { sort_by, order, tag, is_online, is_free, limit, p } = request.query;

    if (tag) {
        checkTagExists(tag).catch((error: Error) => {
            next(error);
        });
    }

    selectEvents(sort_by, order, tag, is_online, is_free, limit, p)
    .then((events: Array<object>) => {
        response.status(200).send({ events });
    })
    .catch((error: Error) => {
        next(error);
    });
}