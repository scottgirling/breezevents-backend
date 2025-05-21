import { CustomResponse } from "../controllers/interfaces/types";

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
    describe("Queries", () => {
        describe("sort_by", () => {
            test("200: responds with a sorted array of event objects by a valid column with an appropriate status code", () => {
                return request(app)
                .get("/api/events?sort_by=price")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    const output: Array<any> = events;
                    expect(output[0].price).toBe(0.00);
                    expect(output[1].price).toBe(0.00);
                    expect(output[2].price).toBe(95.00);
                    expect(output[3].price).toBe(150.00);
                    expect(output[4].price).toBe(180.00);
                });
            });
            test("200: responds with a sorted array of event objects by the default column ('start_time') when one is not specifically selected, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    const output: Array<any> = events;
                    expect(output[0].start_time).toBe("2025-07-18T09:00:00Z");
                    expect(output[1].start_time).toBe("2025-08-20T10:00:00Z");
                    expect(output[2].start_time).toBe("2025-09-12T09:30:00Z");
                    expect(output[3].start_time).toBe("2025-10-14T09:00:00Z");
                    expect(output[4].start_time).toBe("2025-11-05T10:00:00Z");
                });
            });
            test("400: responds with an appropriate status code and error message when sorted by an invalid, non-existent column", () => {
                return request(app)
                .get("/api/events?sort_by=title")
                .expect(400)
                .then(({ body: { msg } } : { body: CustomResponse }) => {
                    expect(msg).toBe("Invalid 'Sort By' or 'Order' query.");
                });
            });
        });
        describe("order", () => {
            test("200: responds with an ordered array of event objects according to the 'order' query, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events?order=desc")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    const output: Array<any> = events;
                    expect(output[0].start_time).toBe("2025-11-05T10:00:00Z");
                    expect(output[1].start_time).toBe("2025-10-14T09:00:00Z");
                    expect(output[2].start_time).toBe("2025-09-12T09:30:00Z");
                    expect(output[3].start_time).toBe("2025-08-20T10:00:00Z");
                    expect(output[4].start_time).toBe("2025-07-18T09:00:00Z");
                });
            });
            test("200: responds with an ordered array of event objects by a default value ('asc') when one is not specifically selected, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    const output: Array<any> = events;
                    expect(output[0].start_time).toBe("2025-07-18T09:00:00Z");
                    expect(output[1].start_time).toBe("2025-08-20T10:00:00Z");
                    expect(output[2].start_time).toBe("2025-09-12T09:30:00Z");
                    expect(output[3].start_time).toBe("2025-10-14T09:00:00Z");
                    expect(output[4].start_time).toBe("2025-11-05T10:00:00Z");
                });
            });
            test("400: responds with an appropriate status code and error message when ordered by an invalid, non-existent value", () => {
                return request(app)
                .get("/api/events?order=high-to-low")
                .expect(400)
                .then(({ body: { msg } } : { body: CustomResponse }) => {
                    expect(msg).toBe("Invalid 'Sort By' or 'Order' query.");
                });
            });
        });
        describe("filters", () => {
            describe("tag", () => {
                test("200: responds with a filtered array of event objects according to the 'tag' query, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?tag=ai")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        expect(events.length).toBe(2);
                    });
                });
                test("200: responds with an empty array and an appropriate status code when passed a valid 'tag' query but not events currently exist on it", () => {
                    return request(app)
                    .get("/api/events?tag=healthtech")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        expect(events.length).toBe(0);
                    });
                });
                test("404: responds with an appropriate status code and error message when passed a non-existent 'tag' query", () => {
                    return request(app)
                    .get("/api/events?tag=edtech")
                    .expect(404)
                    .then(({ body: { msg } } : { body: CustomResponse }) => {
                        expect(msg).toBe("Tag does not exist.");
                    });
                });
            })
            describe("is_online", () => {
                test("200: responds with a filtered array of event objects according to the 'is_online' query, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?is_online=true")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        const output: Array<any> = events;
                        expect(output.length).toBe(2);
                        output.forEach((event) => {
                            expect(event.is_online).toBe(true);
                        });
                    });
                });
                test("200: responds with a filtered array of event objects when multiple filters are provided, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?tag=innovation&is_online=true")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        expect(events.length).toBe(1);
                    });
                });
                test("400: responds with an appropriate status code and error message when passed an invalid 'is_online' query", () => {
                    return request(app)
                    .get("/api/events?tag=innovation&is_online=maybe")
                    .expect(400)
                    .then(({ body: { msg } } : { body: CustomResponse }) => {
                        expect(msg).toBe("Invalid data type.");
                    });
                });
            });
            describe("is_free", () => {
                test("200: responds with a filtered array of event objects according to the 'is_free' query, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?is_free=true")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        const output: Array<any> = events;
                        expect(output.length).toBe(2);
                        output.forEach((event) => {
                            expect(event.is_free).toBe(true);
                        });
                    });
                });
                test("200: responds with a filtered array of event objects when multiple filters are provided, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?tag=technology&is_online=true&is_free=true")
                    .expect(200)
                    .then(({ body: { events } } : { body: CustomResponse }) => {
                        expect(events.length).toBe(1);
                    });
                });
                test("400: responds with an appropriate status code and error message when passed an invalid 'is_free' query", () => {
                    return request(app)
                    .get("/api/events?is_free=absolutely!")
                    .expect(400)
                    .then(({ body: { msg } } : { body: CustomResponse }) => {
                        expect(msg).toBe("Invalid data type.");
                    });
                });
            });
        });
    });
    describe("Pagination", () => {
        describe("limit", () => {
            test("200: responds with an array of event objects according to the 'limit' query, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events?limit=4")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    expect(events.length).toBe(4);
                });
            });
            test("200: responds with an array of event objects according to a default 'limit' value (12) when one is not specifically selected, as well as an appriopriate status code", () => {
                return request(app)
                .get("/api/events")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    expect(events.length).toBe(5);
                });
            });
            test("400: responds with an appropriate status code and error message when passed an invalid 'limit' query", () => {
                return request(app)
                .get("/api/events?limit=three")
                .expect(400)
                .then(({ body: { msg } } : { body: CustomResponse }) => {
                    expect(msg).toBe("Invalid data type.");
                });
            });
        });
        describe("p", () => {
            test("200: responds with an array of event objects according to the 'p' query, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events?sort_by=price&limit=2&p=3")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    const output: Array<any> = events;
                    expect(output.length).toBe(1);
                    expect(output[0].price).toBe(180.00);
                });
            });
            test("200: responds with an array of event objects according to a default 'p' value (1) when one is not specifically selected, as well as an appropriate status code", () => {
                return request(app)
                .get("/api/events?limit=3")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    expect(events.length).toBe(3);
                });
            });
            test("400: responds with an appropriate status code and error message when passed an invalid 'p' query", () => {
                return request(app)
                .get("/api/events?p=seventeen")
                .expect(400)
                .then(({ body: { msg } } : { body: CustomResponse }) => {
                    expect(msg).toBe("Invalid data type.");
                });
            });
            test("404: responds with an appropriate status code and error message when passed a valid but non-existent 'p' query", () => {
                return request(app)
                .get("/api/events?tag=fintech&p=77")
                .expect(404)
                .then(({ body: { msg } } : { body: CustomResponse }) => {
                    expect(msg).toBe("Page does not exist.");
                });
            });
        });
    });
});

describe("GET /api/events/:event_id", () => {
    test("200: responds with an individual event object, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/events/1")
        .expect(200)
        .then(({ body: { event } } : { body: CustomResponse }) => {
            const expectedOutput = {
                "event_id": 1,
                "title": "UK Tech Expo 2025",
                "slug": "uk-tech-expo-2025",
                "event_overview": "A 3-day expo showcasing emerging technologies and innovation from across the UK.",
                "description": "Join thousands of innovators, developers, entrepreneurs, and tech enthusiasts at the UK Tech Expo 2025 — the country's leading event for showcasing breakthrough technologies, digital transformation, and the future of industry. Over three days, explore more than 150 exhibitors, attend keynote sessions by global tech leaders, and participate in hands-on workshops designed to empower the next generation of digital talent. Whether you're interested in AI, sustainability, fintech, or cybersecurity, this event offers insights, networking, and inspiration for everyone in the tech ecosystem.",
                "start_time": "2025-10-14T09:00:00Z",
                "end_time": "2025-10-16T17:00:00Z",
                "timezone": "Europe/London",
                "venue_id": 1,
                "is_online": false,
                "host_id": 2,
                "event_type": "expo",
                "capacity": 800,
                "attendees_count": 545,
                "is_free": false,
                "price": 180.00,
                "event_image_url": "https://example.co.uk/images/uktechexpo2025.jpg",
                "is_published": true,
                "created_at": "2025-05-10T10:00:00.000Z",
                "last_updated_at": "2025-05-12T14:00:00.000Z"
            };
            expect(event).toMatchObject(expectedOutput);
            expect(Object.entries(event).length).toBe(20);
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent id", () => {
        return request(app)
        .get("/api/events/10")
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Event does not exist.");
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid id", () => {
        return request(app)
        .get("/api/events/one")
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
});

describe("GET /api/tags", () => {
    test("200: responds with an array of tag objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/tags")
        .expect(200)
        .then(({ body: { tags } } : { body: CustomResponse }) => {
            expect(Array.isArray(tags)).toBe(true);
            expect(tags.length).toBe(7);
            tags.forEach((tag) => {
                expect(tag).toHaveProperty("tag_id", expect.any(Number));
                expect(tag).toHaveProperty("name", expect.any(String));
                expect(tag).toHaveProperty("slug", expect.any(String));
                expect(tag).toHaveProperty("created_at", expect.any(String));
                expect(tag).toHaveProperty("last_updated_at", expect.any(String));
                expect(Object.entries(tag).length).toBe(5);
            });
        });
    });
});

describe("GET /api/user-events", () => {
    test("200: responds with an array of user-event objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/user-events/1")
        .expect(200)
        .then(({ body: { userEvents } } : { body: CustomResponse }) => {
            expect(Array.isArray(userEvents)).toBe(true);
            expect(userEvents.length).toBe(3);
            userEvents.forEach((userEvent) => {
                expect(userEvent).toHaveProperty("user_id", expect.any(Number));
                expect(userEvent).toHaveProperty("event_id", expect.any(Number));
                expect(Object.entries(userEvent).length).toBe(2);
            });
        });
    });
});