import { CustomResponse } from "./interfaces/types";
const selectTags = require("../models/selectTags");

const getTags = (request: Request, response: CustomResponse) => {
    selectTags()
    .then((tags: Array<object>) => {
        response.status(200).send({ tags });
    });
}

module.exports = getTags;