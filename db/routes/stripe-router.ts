const postCheckoutSession = require("../../controllers/postCheckoutSession");

export const stripeRouter = require("express").Router();

stripeRouter
    .route("/")
    .post(postCheckoutSession);