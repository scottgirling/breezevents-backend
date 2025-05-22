import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectUserByUsername = require("../models/selectUserByUsername");

const getUserByUsername = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { username } = request.params;
    selectUserByUsername(username)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = getUserByUsername;