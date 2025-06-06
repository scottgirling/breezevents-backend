const postSupabaseClient = require("../../controllers/postSupabaseClient");

const authRouter = require("express").Router();

authRouter
    .route("/")
    .post(postSupabaseClient);

module.exports = authRouter;