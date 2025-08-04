import { NextFunction, Request, Response } from "express";
import { selectUserById } from "../models/selectUserById";

export const getUserById = (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.params;
    selectUserById(user_id)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}