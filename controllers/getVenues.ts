import { CustomRequest, CustomResponse } from "./interfaces/types";
import { selectVenues } from "../models/selectVenues";

export const getVenues = (request: CustomRequest, response: CustomResponse) => {
    selectVenues()
    .then((venues: Array<object>) => {
        response.status(200).send({ venues });
    });
}