import { NextFunction, Request, Response } from "express";
import { selectVenues } from "../models/selectVenues";

export const getVenues = (request: Request, response: Response, next: NextFunction) => {
    selectVenues()
    .then((venues: Array<object>) => {
        response.status(200).send({ venues });
    })
    .catch((error: Error) => {
        next(error);
    });
}