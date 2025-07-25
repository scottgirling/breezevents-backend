import { NextFunction } from "express";
import { CustomRequest, CustomResponse, CustomError } from "../controllers/interfaces/types";
import { getAuthConfirmation } from "../controllers/getAuthConfirmation";
import { handleOAuthSignIn } from "../controllers/handleOAuthSignIn";

const express = require("express");
export const app = express();

import cors from "cors";
import { apiRouter } from "./routes/api-router";
import { webhookRouter } from "./routes/webhook-router";

app.use(express.static("public"));
app.use(cors());

app.use("/api", express.json(), apiRouter);
app.get("/auth/confirm", getAuthConfirmation);
app.get("/auth/callback", handleOAuthSignIn);
app.use("/webhook", webhookRouter);

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
        response.status(404).send({ msg: "Invalid request - one or more ID not found." });
    }
    next(error);
});