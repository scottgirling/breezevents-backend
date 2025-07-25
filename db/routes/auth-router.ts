const postSupabaseClient = require("../../controllers/postSupabaseClient");

export const authRouter = require("express").Router();

authRouter
    .route("/")
    .post(postSupabaseClient);