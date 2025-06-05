import { NextFunction, Response } from "express";
import { CustomRequest } from "./interfaces/types";

require("dotenv").config({
    path: `${__dirname}/../../.env.STRIPE_SECRETS`
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

if (!stripe) throw new Error("STRIPE_SECRET_KEY is missing.");



const postCheckoutSession = (request: CustomRequest, response: Response, next: NextFunction) => {
    const { event, ticketQuantity } = request.body;

    stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: event.title
                    },
                    unit_amount: Math.round(event.price * 100)
                },
                quantity: ticketQuantity
            }
        ],
        metadata: {
            event,
            ticketQuantity
        },
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/events"
    })
    .then((session: any) => {
        response.json({ url: session.url });
    })
    .catch((error: Error) => {
        next(error);
    });
}

module.exports = postCheckoutSession;