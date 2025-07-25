import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectUserById } from "../models/selectUserById";

export const getUserById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    selectUserById(user_id)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}