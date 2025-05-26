import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const checkUserExists = require("../models/utils/checkUserExists");
const updatedUserByUsername = require("../models/updateUserByUsername");

const patchUserByUsername = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    const { name, username, email, password_hash, bio, avatar_url } = request.body;

    checkUserExists(user_id)
    .then(() => {
        return updatedUserByUsername(user_id, name, username, email, password_hash, bio, avatar_url)
    })
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = patchUserByUsername;