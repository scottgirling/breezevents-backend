import { CustomResponse } from "./interfaces/types";
const selectUserEventsById = require("../models/selectUserEvents");

const getUserEventsById = (request: any, response: CustomResponse) => {
    const { user_id } = request.params;
    selectUserEventsById(user_id)
    .then((userEvents: Array<object>) => {
        response.status(200).send({ userEvents });
    });
}

module.exports = getUserEventsById;