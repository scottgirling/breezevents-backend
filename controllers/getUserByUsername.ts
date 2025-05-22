import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectUserByUsername = require("../models/selectUserByUsername");

const getUserByUsername = (request: CustomRequest, response: CustomResponse, next: any) => {
    const { username } = request.params;
    selectUserByUsername(username)
    .then((user: object) => {
        response.status(200).send({ user });
    })
    .catch((error: object) => {
        next(error);
    });
}

module.exports = getUserByUsername;