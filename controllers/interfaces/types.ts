import { Request, Response } from "express";

export interface CustomResponse extends Response {
    status: any;
    send: any;
    body: any;
    endpoints: object;
    events: Array<object>;
    event: object;
    msg: string;
    tags: Array<object>;
    user: object;
    userEvent: object;
    venues: Array<object>;
    venue: object;
    eventTag: object;
}

export interface CustomRequest extends Request {
    params: any;
    query: any;
    body: any;
}

export interface CustomError extends Error {
    status: number;
    code: string;
    msg: string;
}

export interface SupasbaseContext {
    request: Request,
    response: Response
}