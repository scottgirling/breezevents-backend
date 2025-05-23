import { NextFunction } from "express";
import { CustomRequest, CustomResponse, CustomError } from "../controllers/interfaces/types";

const express = require("express");
const app = express();

const getEndpoints = require ("../controllers/getEndpoints");
const getEvents = require("../controllers/getEvents");
const getEventById = require("../controllers/getEventById");
const getEventsByHostUsername = require("../controllers/getEventsByHostUsername");
const getTags = require("../controllers/getTags");
const getUserByUsername = require("../controllers/getUserByUsername");
const getEventsByUsername = require("../controllers/getEventsByUsername");
const patchEventById = require("../controllers/patchEventById");
const deleteEventById = require("../controllers/deleteEventById");
const postUserEvent = require("../controllers/postUserEvent");
const postEvent = require("../controllers/postEvent");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/events", getEvents);

app.get("/api/events/:event_id", getEventById);

app.get("/api/events/host/:username", getEventsByHostUsername);

app.get("/api/tags", getTags);

app.get("/api/users/:username", getUserByUsername);

app.get("/api/:username/events", getEventsByUsername);

app.patch("/api/events/:event_id", patchEventById);

app.delete("/api/events/:event_id", deleteEventById);

app.post("/api/user_events", postUserEvent);

app.post("/api/events", postEvent);

app.use((error: CustomError, request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    if (error.status && error.msg) {
        response.status(error.status).send({ msg: error.msg });
    }
    next(error);
});

app.use((error: CustomError, request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    if (error.code === "22P02" || error.code === "42703") {
        response.status(400).send({ msg: "Invalid data type." });
    }
    next(error);
});

app.use((error: CustomError, request: CustomRequest, response: CustomResponse, next: NextFunction) => {
    if (error.code === "23502") {
        response.status(400).send({ msg: "Invalid request - missing field(s)." });
    }
    next(error);
});

app.use((error: CustomError, request: CustomRequest, response:CustomResponse, next: NextFunction) => {
    if (error.code === "23503") {
        response.status(404).send({ msg: "User or event not found." });
    }
    next(error);
});

module.exports = app;