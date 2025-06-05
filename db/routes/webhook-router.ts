const bodyParser = require("body-parser");

const postWebhook = require("../../controllers/postWebhook");

const webhookRouter = require("express").Router();

webhookRouter
    .route("/")
    .post(bodyParser.raw({ type: "application/json" }), postWebhook);

module.exports = webhookRouter;