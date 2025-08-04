import { NextFunction, Request, Response } from "express";
import { checkTagExists } from "../models/utils/checkTagExists";
import { selectEvents } from "../models/selectEvents";

export const getEvents = (request: Request, response: Response, next: NextFunction) => {
    const { sort_by, order, tag, is_online, is_free, limit, p } = request.query as {
        sort_by?: string;
        order?: string;
        tag?: string;
        is_online?: string;
        is_free?: string;
        limit?: number;
        p?: number
    };

    if (tag && typeof tag === "string") {
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