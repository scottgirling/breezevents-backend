import { NextFunction, Request, Response } from "express";
import { addUser } from "../models/addUser";

export const postUser = (request: Request, response: Response, next: NextFunction) => {
    const { user_id, name, username, email, bio, avatar_url, role } = request.body;
    addUser(user_id, name, username, email, bio, avatar_url, role)
    .then((user: object) => {
        response.status(201).send({ user });
    })
    .catch((error: Error) => {
        next(error);
    });
}