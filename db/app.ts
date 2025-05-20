const express = require("express");
const app = express();

const getEndpoints = require ("../controllers/getEndpoints");
const getEvents = require("../controllers/getEvents");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/events", getEvents);

module.exports = app;