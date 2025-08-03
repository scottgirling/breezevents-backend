import { Response } from "express";

const endpoints = require(`${__dirname}/../../endpoints.json`);
    
export const getEndpoints = (request: Request, response: Response) => {
    response.status(200).send({ endpoints });
}