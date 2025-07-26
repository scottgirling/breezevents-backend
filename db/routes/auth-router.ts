import { postSupabaseClient } from "../../controllers/postSupabaseClient";

export const authRouter = require("express").Router();

authRouter
    .route("/")
    .post(postSupabaseClient);