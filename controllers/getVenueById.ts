import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectVenueById } from "../models/selectVenueById";

export const getVenueById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { venue_id } = request.params;
    selectVenueById(venue_id)
    .then((venue: object) => {
        response.status(200).send({ venue });
    })
    .catch((error: Error) => {
        next(error);
    });
}