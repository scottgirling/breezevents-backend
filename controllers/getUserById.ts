import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectUserById = require("../models/selectUserById");

const getUserById = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { user_id } = request.params;
    selectUserById(user_id)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = getUserById;