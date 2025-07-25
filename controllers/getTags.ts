import { CustomResponse } from "./interfaces/types";
import { selectTags } from "../models/selectTags";

export const getTags = (request: Request, response: CustomResponse) => {
    selectTags()
    .then((tags: Array<object>) => {
        response.status(200).send({ tags });
    });
}