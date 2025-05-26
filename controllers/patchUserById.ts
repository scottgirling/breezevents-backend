import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const updateUserById = require("../models/updateUserById");

const patchUserById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    const { name, username, email, password_hash, bio, avatar_url } = request.body;
    updateUserById(user_id, name, username, email, password_hash, bio, avatar_url)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = patchUserById;