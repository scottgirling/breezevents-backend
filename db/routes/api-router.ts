import { getEndpoints } from "../../controllers/getEndpoints";

export const apiRouter = require("express").Router();
import { eventsRouter } from "./events-router";
import { eventTagsRouter } from "./event_tags-router";
import { tagsRouter } from "./tags-router";
import { userEventsRouter } from "./user_events-router";
import { usersRouter } from "./users-router";
import { venuesRouter } from "./venues-router";
import { stripeRouter } from "./stripe-router";
import { sessionRouter } from "./session-router";
import { authRouter } from "./auth-router";

apiRouter.use("/events", eventsRouter);
apiRouter.use("/event_tags", eventTagsRouter);
apiRouter.use("/tags", tagsRouter);
apiRouter.use("/user_events", userEventsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/venues", venuesRouter);
apiRouter.use("/create-checkout-session", stripeRouter);
apiRouter.use("/retrieve-session", sessionRouter);
apiRouter.use("/signup", authRouter);

apiRouter.get("/", getEndpoints);