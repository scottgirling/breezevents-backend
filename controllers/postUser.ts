import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "./interfaces/types";
const addUser = require("../models/addUser");

const postUser = (request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    const { name, username, email, password_hash, bio, avatar_url, role } = request.body;
    addUser(name, username, email, password_hash, bio, avatar_url, role)
    .then((user: object) => {
        response.status(201).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = postUser;