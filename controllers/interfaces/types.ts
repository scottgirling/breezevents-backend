import { Request, Response } from "express";
import { SingleEvent } from "../../db/data/test-data/events";

export interface HostEvent extends SingleEvent {
    host: string;
}

export interface EventAndHostAndVenue extends SingleEvent {
    venue_name: string;
    venue_type: string;
    location: string;
    venue_capacity: number;
    facilities: string[];
    contact_email: string;
    contact_phone: string;
    website_url: string;
    event_types: string[];
    accessibility_features: string[];
    parking_info: string;
    image_gallery: string[];
    nearby_transport: string;
    venue_created_at: string;
    venue_last_updated_at: string;
    name: string;
    email: string;
    bio: string;
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