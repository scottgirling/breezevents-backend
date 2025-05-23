const getEndpoints = require("../../controllers/getEndpoints");

const apiRouter = require("express").Router();
const eventsRouter = require("./events-router");
const tagsRouter = require("./tags-router");
const userEventsRouter = require("./user_events-router");
const usersRouter = require("./users-router");
const venuesRouter = require("./venues-router");

apiRouter.use("/events", eventsRouter);
apiRouter.use("/tags", tagsRouter);
apiRouter.use("/user_events", userEventsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/venues", venuesRouter);

apiRouter.get("/", getEndpoints);

module.exports = apiRouter;