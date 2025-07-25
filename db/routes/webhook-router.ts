const bodyParser = require("body-parser");

import { postWebhook } from "../../controllers/postWebhook";

export const webhookRouter = require("express").Router();

webhookRouter
    .route("/")
    .post(bodyParser.raw({ type: "application/json" }), postWebhook);