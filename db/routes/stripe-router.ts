const postCheckoutSession = require("../../controllers/postCheckoutSession");

const stripeRouter = require("express").Router();

stripeRouter
    .route("/")
    .post(postCheckoutSession);

module.exports = stripeRouter;