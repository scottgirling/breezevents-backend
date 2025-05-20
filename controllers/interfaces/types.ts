export interface CustomResponse extends Response {
    status: any;
    send: any;
    body: any;
    endpoints: object;
    events: Array<object>;
    event: object;
    msg: string;
    tags: Array<object>
}

export interface CustomRequest extends Request {
    params: any;
}