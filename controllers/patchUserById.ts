import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
import { updateUserById } from "../models/updateUserById";

export const patchUserById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    const { name, username, email, bio, avatar_url } = request.body;
    updateUserById(user_id, name, username, email, bio, avatar_url)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}