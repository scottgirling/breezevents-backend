import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { addUserEvent } from "../models/addUserEvent";

export const postUserEvent = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id, event_id } = request.body;
    addUserEvent(user_id, event_id)
    .then((userEvent: object) => {
        response.status(201).send({ userEvent });
    })
    .catch((error: Error) => {
        next(error);
    });
}