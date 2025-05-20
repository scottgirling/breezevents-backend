import { CustomResponse } from "../controllers/interfaces/types";
import { Event } from "../db/data/test-data/events";
import {expect, jest, test} from '@jest/globals';
import 'jest-extended';

const request = require("supertest");
const app = require("../db/app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const endpointsJSON = require(`${__dirname}/../../endpoints.json`);
const testData = require("../db/data/test-data/index");

beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return connection.end();
});

describe("GET /api", () => {
    test("200: responds with an object documenting each endpoint - including a description, example path and example response", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } } : { body: CustomResponse }) => {
            expect(endpoints).toEqual(endpointsJSON);
        });
    });
});

describe("GET /api/events", () => {
    test("200: responds with an array of event objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } } : { body: CustomResponse }) => {
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBe(5);
            events.forEach((event) => {
                expect(event).toHaveProperty("event_id", expect.any(Number));
                expect(event).toHaveProperty("title", expect.any(String));
                expect(event).toHaveProperty("slug", expect.any(String));
                expect(event).toHaveProperty("event_overview", expect.any(String));
                expect(event).toHaveProperty("description", expect.any(String));
                expect(event).toHaveProperty("start_time", expect.any(String));
                expect(event).toHaveProperty("end_time", expect.any(String));
                expect(event).toHaveProperty("timezone", expect.any(String));
                expect(event).toHaveProperty("venue_id", expect.any(Number));
                expect(event).toHaveProperty("is_online", expect.any(Boolean));
                expect(event).toHaveProperty("host_id", expect.any(Number));
                expect(event).toHaveProperty("event_type", expect.any(String));
                expect(event).toHaveProperty("capacity", expect.any(Number));
                expect(event).toHaveProperty("attendees_count", expect.any(Number));
                expect(event).toHaveProperty("is_free", expect.any(Boolean));
                expect(event).toHaveProperty("price", expect.any(Number));
                expect(event).toHaveProperty("event_image_url", expect.any(String));
                expect(event).toHaveProperty("is_published", expect.any(Boolean));
                expect(event).toHaveProperty("created_at", expect.any(String));
                expect(event).toHaveProperty("last_updated_at", expect.any(String));
                expect(Object.entries(event).length).toBe(20);
            });
        });
    });
});