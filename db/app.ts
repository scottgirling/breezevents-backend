import { NextFunction } from "express";
import { CustomRequest, CustomResponse, CustomError } from "../controllers/interfaces/types";
import { Response } from "express";
// const createCheckoutSession = require("../controllers/createCheckoutSession");

require("dotenv").config({
    path: `${__dirname}/../../.env.STRIPE_SECRET_KEY`
});

const express = require("express");
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = require("cors");
const apiRouter = require("./routes/api-router");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.post("/create-checkout-session", async (request: CustomRequest, response: Response) => {
    // const { events } = request.body;

    // const lineItems = events.map((event: any) => {
    //     price_data: {
    //         currency: "gbp"
    //         product_details: {
    //             name: event.title
    //         }
    //         unit_amount: Math.round(event.price * 100)
    //     }
    //     quantity: events.length;
    // })

    // const session = await stripe.checkout.session.create({
    //     line_items: lineItems,
    //     mode: "payment",
    //     success_url: "http://localhost:5173?success=true",
    //     cancel_url: "http://localhost:5173?canceled=true"
    // })

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "Ticket"
                        },
                        unit_amount: 1000
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        })
    
        response.json({ url: session.url });
    } catch (err) {
        console.error("Error creating checkout session", err);
    }
})

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
        response.status(404).send({ msg: "User or event not found." });
    }
    next(error);
});

module.exports = app, stripe;