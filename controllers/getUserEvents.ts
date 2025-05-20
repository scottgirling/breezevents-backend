import { CustomResponse } from "./interfaces/types";
const selectUserEvents = require("../models/selectUserEvents");

const getUserEvents = (request: any, response: CustomResponse) => {
    selectUserEvents()
    .then((userEvents: Array<object>) => {
        response.status(200).send({ userEvents });
    });
}

module.exports = getUserEvents;