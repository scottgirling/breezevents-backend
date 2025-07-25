import { CustomResponse } from './interfaces/types';

const endpoints = require(`${__dirname}/../../endpoints.json`);
    
export const getEndpoints = (request: Request, response: CustomResponse) => {
    response.status(200).send({ endpoints });
}