import { NextFunction, Request, Response } from "express";
import { selectVenueById } from "../models/selectVenueById";

export const getVenueById = (request: Request, response: Response, next: NextFunction) => {
    const { venue_id } = request.params;
    selectVenueById(venue_id)
    .then((venue: object) => {
        response.status(200).send({ venue });
    })
    .catch((error: Error) => {
        next(error);
    });
}