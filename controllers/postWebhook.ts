import { NextFunction, Response, Request } from "express";
import type Stripe from 'stripe';
import axios from "axios";

require("dotenv").config({
    path: `${__dirname}/../../.env.STRIPE_SECRETS`
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const postWebhook = async (request: Request, response: Response, next: NextFunction) => {
    const sig = request.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) throw new Error("STRIPE_WEBHOOK_SECRET is missing.");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${(error as Error).message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const rawEventDetails = session.metadata?.eventDetails;
        const eventDetails = rawEventDetails && JSON.parse(rawEventDetails);
        const ticketQuantity = session.metadata?.ticketQuantity;
        const userId = session.metadata?.user_id;

        if (!eventDetails || !ticketQuantity) {
            return response.status(400).send("Missing required metadata.");
        }

        try {
            await axios.patch(`https://events-platform-be-1fmx.onrender.com/api/events/${eventDetails.event_id}`, {
                attendeeCountChange: ticketQuantity
            });
        } catch (error) {
            return response.status(500).send("Database update failed (events).");
        }

        try {
            await axios.post("https://events-platform-be-1fmx.onrender.com/api/user_events", {
                user_id: userId,
                event_id: eventDetails.event_id
            });
        } catch (error) {
            return response.status(500).send("Database update failed (user_events).");
        }
    }

    response.status(200).json({ received: true });
}