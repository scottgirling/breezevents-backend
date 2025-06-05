import { Response, Request } from "express";

require("dotenv").config({
    path: `${__dirname}/../../.env.STRIPE_SECRETS`
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

if (!stripe) throw new Error("STRIPE_SECRET_KEY is missing.");

const getSession = async (request: Request, response: Response) => {
    const { session_id } = request.query;

    try {
        const session = await stripe.checkout.retrieve(session_id);
        response.json(session);
    } catch (error) {
        console.error("Error retrieving session ID:", error);
        response.status(500).send("Failed to retrieve session data.");
    }
}

module.exports = getSession;