import { NextFunction, Request, Response } from "express";
import { selectTags } from "../models/selectTags";

export const getTags = (request: Request, response: Response, next: NextFunction) => {
    selectTags()
    .then((tags: Array<object>) => {
        response.status(200).send({ tags });
    })
    .catch((error: Error) => {
        next(error);
    });
}