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

export interface IndividualEvent {
    event_id: number;
    title: string;
    slug: string;
    event_overview: string;
    description: string;
    start_time: string;
    end_time: string;
    timezone: string;
    venue_id: number;
    is_online: boolean;
    host_id: number;
    event_type: string;
    capacity: number;
    attendees_count: number;
    is_free: boolean;
    price: number;
    event_image_url: string;
    is_published: boolean;
    created_at: string;
    last_updated_at: string;
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