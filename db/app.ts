const express = require("express");
const app = express();

const getEndpoints = require ("../controllers/getEndpoints");
const getEvents = require("../controllers/getEvents");
const getEventById = require("../controllers/getEventById");
const getEventsByHostUsername = require("../controllers/getEventsByHostUsername");
const getTags = require("../controllers/getTags");
const getUserByUsername = require("../controllers/getUserByUsername");
const getUserEventsById = require("../controllers/getUserEventsById");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/events", getEvents);

app.get("/api/events/:event_id", getEventById);

app.get("/api/events/host/:username", getEventsByHostUsername);

app.use("/api/tags", getTags);

app.use("/api/users/:username", getUserByUsername);

app.use("/api/user-events/:user_id", getUserEventsById);

app.use((error: any, request: any, response: any, next: any) => {
    if (error.status && error.msg) {
        response.status(error.status).send({ msg: error.msg });
    }
    next(error);
});

app.use((error: any, request: any, response: any, next: any) => {
    if (error.code === "22P02" || error.code === "42703") {
        response.status(400).send({ msg: "Invalid data type." });
    }
    next(error);
})

module.exports = app;