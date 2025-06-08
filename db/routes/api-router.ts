const getEndpoints = require("../../controllers/getEndpoints");

const apiRouter = require("express").Router();
const eventsRouter = require("./events-router");
const eventTagsRouter = require("./event_tags-router");
const tagsRouter = require("./tags-router");
const userEventsRouter = require("./user_events-router");
const usersRouter = require("./users-router");
const venuesRouter = require("./venues-router");
const stripeRouter = require("./stripe-router");
const sessionRouter = require("./session-router");
const authRouter = require("./auth-router");

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

module.exports = apiRouter;