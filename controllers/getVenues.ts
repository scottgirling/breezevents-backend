import { CustomRequest, CustomResponse } from "./interfaces/types";
const selectVenues = require("../models/selectVenues");

const getVenues = (request: CustomRequest, response: CustomResponse) => {
    selectVenues()
    .then((venues: Array<object>) => {
        response.status(200).send({ venues });
    });
}

module.exports = getVenues;