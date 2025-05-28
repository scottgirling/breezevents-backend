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
    test("200: responds with an array of published event objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } } : { body: CustomResponse }) => {
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBe(4);
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
                    expect(output[3].price).toBe(180.00);
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
                    expect(output[0].start_time).toBe("2025-10-14T09:00:00Z");
                    expect(output[1].start_time).toBe("2025-09-12T09:30:00Z");
                    expect(output[2].start_time).toBe("2025-08-20T10:00:00Z");
                    expect(output[3].start_time).toBe("2025-07-18T09:00:00Z");
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
                        expect(output.length).toBe(1);
                        output.forEach((event) => {
                            expect(event.is_online).toBe(true);
                        });
                    });
                });
                test("200: responds with a filtered array of event objects when multiple filters are provided, as well as an appropriate status code", () => {
                    return request(app)
                    .get("/api/events?tag=technology&is_online=true")
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
                .get("/api/events?limit=3")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    expect(events.length).toBe(3);
                });
            });
            test("200: responds with an array of event objects according to a default 'limit' value (12) when one is not specifically selected, as well as an appriopriate status code", () => {
                return request(app)
                .get("/api/events")
                .expect(200)
                .then(({ body: { events } } : { body: CustomResponse }) => {
                    expect(events.length).toBe(4);
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
                .get("/api/events?sort_by=price&limit=3&p=2")
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

describe("GET /api/events/host/:user_id", () => {
    test("200: responds with an array of event objects according to the event host, as well as an appropriate status code", () => {
        return request(app)
        .get("/api/events/host/2")
        .expect(200)
        .then(({ body: { events } } : { body: CustomResponse }) => {
            const output: Array<any> = events;
            expect(output.length).toBe(2);
            output.forEach((event) => {
                expect(event.host).toBe("ahmedben96");
            });
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid 'user_id'", () => {
        return request(app)
        .get("/api/events/host/forty-five")
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent username", () => {
        return request(app)
        .get("/api/events/host/45")
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Profile not found.");
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

describe("GET /api/venues", () => {
    test("200: responds with an array of venue objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/venues")
        .expect(200)
        .then(({ body: { venues } } : { body: CustomResponse}) => {
            expect(Array.isArray(venues)).toBe(true);
            expect(venues.length).toBe(3);
            venues.forEach((venue) => {
                expect(venue).toHaveProperty("venue_id", expect.any(Number))
                expect(venue).toHaveProperty("venue_name", expect.any(String));
                expect(venue).toHaveProperty("venue_type", expect.any(String));
                expect(venue).toHaveProperty("location", expect.any(String));
                expect(venue).toHaveProperty("capacity", expect.any(Number));
                expect(venue).toHaveProperty("facilities", expect.any(Array));
                expect(venue).toHaveProperty("contact_email", expect.any(String));
                expect(venue).toHaveProperty("contact_phone", expect.any(String));
                expect(venue).toHaveProperty("website_url", expect.any(String));
                expect(venue).toHaveProperty("event_types", expect.any(Array));
                expect(venue).toHaveProperty("accessibility_features", expect.any(Array));
                expect(venue).toHaveProperty("parking_info", expect.any(String));
                expect(venue).toHaveProperty("image_gallery", expect.any(Array));
                expect(venue).toHaveProperty("nearby_transport", expect.any(String));
                expect(venue).toHaveProperty("created_at", expect.any(String));
                expect(venue).toHaveProperty("last_updated_at", expect.any(String));
                expect(Object.entries(venue).length).toBe(16);
            });
        });
    });
});

describe("GET /api/users/:user_id", () => {
    test("200: responds with an individual user object, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body: { user } } : { body: CustomResponse }) => {
            expect(user).toMatchObject({
                "user_id": 1,
                "name": "Alice Thompson",
                "username": "alice_thompson123",
                "email": "alice.thompson@example.com",
                "password_hash": "$2b$10$J4lkqkGcN9MbH1E4ytQsE.8QZB/UO1w8hPbmC34RhOeSkqJK9sFhi",
                "role": "attendee",
                "created_at": "2025-05-01T09:00:00.000Z",
                "last_updated_at": "2025-05-10T10:00:00.000Z",
                "bio": "Tech enthusiast. Always looking for new innovative solutions.",
                "avatar_url": "https://example.com/avatars/alice.jpg"
            });
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid 'user_id'", () => {
        return request(app)
        .get("/api/users/scottgirling")
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent username", () => {
        return request(app)
        .get("/api/users/65")
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("User does not exist.");
        });
    });
});

describe("GET /api/users/:user_id/events", () => {
    test("200: responds with an array of user-event objects, with the appropriate properties and status code", () => {
        return request(app)
        .get("/api/users/1/events")
        .expect(200)
        .then(({ body: { events } } : { body: CustomResponse }) => {
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBe(3);
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
    test("200: responds with an empty array and an appropriate status code when passed an existing username but the user has not signed up to any events yet", () => {
        return request(app)
        .get("/api/users/5/events")
        .expect(200)
        .then(({ body: { events } } : { body: CustomResponse }) => {
            expect(events.length).toBe(0);
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid 'user_id'", () => {
        return request(app)
        .get("/api/users/scottgirling/events")
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent username", () => {
        return request(app)
        .get("/api/users/654/events")
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Profile not found.");
        });
    });
});

describe("PATCH /api/events/:event_id", () => {
    test("200: responds with an updated event object when the 'attendees_count' column is incremented, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/events/1")
        .send({ attendeeCountChange: 1 })
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
                "attendees_count": 546,
                "is_free": false,
                "price": 180.00,
                "event_image_url": "https://example.co.uk/images/uktechexpo2025.jpg",
                "is_published": true,
                "created_at": "2025-05-10T10:00:00.000Z",
                "last_updated_at": "2025-05-12T14:00:00.000Z"
            }
            expect(event).toMatchObject(expectedOutput);
            expect(Object.entries(event).length).toBe(20);
        });
    });
    test("200: responds with an updated event object when the 'attendees_count' column is decremented, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/events/1")
        .send({ attendeeCountChange: -1 })
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
                "attendees_count": 544,
                "is_free": false,
                "price": 180.00,
                "event_image_url": "https://example.co.uk/images/uktechexpo2025.jpg",
                "is_published": true,
                "created_at": "2025-05-10T10:00:00.000Z",
                "last_updated_at": "2025-05-12T14:00:00.000Z"
            }
            expect(event).toMatchObject(expectedOutput);
            expect(Object.entries(event).length).toBe(20);
        });
    });
    test("400: responds with an appropriate status code and error message when the request body does not contain the correct fields", () => {
        return request(app)
        .patch("/api/events/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
    test("400: responds with an appropriate status code and error message when the request body is passed an invalid 'attendeeCountChange' value", () => {
        return request(app)
        .patch("/api/events/1")
        .send({ attendeeCountChange: "one" })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid id", () => {
        return request(app)
        .patch("/api/events/one")
        .send({ attendeeCountChange: 1 })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent id", () => {
        return request(app)
        .patch("/api/events/33")
        .send({ attendeeCountChange: 1 })
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Profile not found.");
        });
    });
});

describe("PATCH /api/events/update/:event_id", () => {
    test("200: responds with an updated event object when a single event column is amended, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/events/update/1")
        .send({ venue_id: 2 })
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
                "venue_id": 2,
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
            }
            expect(event).toMatchObject(expectedOutput);
            expect(event).toHaveProperty("last_updated_at", expect.any(String));
        });
    });
    test("200: responds with an updated event object when multiple event columns are amended, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/events/update/1")
        .send({
            "title": "UK Technology Expo 2025",
            "event_overview": "A 3-day expo showcasing emerging technologies and innovation from across the United Kingdom.",
            "venue_id": 2,
            "price": 99.00
        })
        .expect(200)
        .then(({ body: { event } } : { body: CustomResponse }) => {
            const expectedOutput = {
                "event_id": 1,
                "title": "UK Technology Expo 2025",
                "slug": "uk-technology-expo-2025",
                "event_overview": "A 3-day expo showcasing emerging technologies and innovation from across the United Kingdom.",
                "description": "Join thousands of innovators, developers, entrepreneurs, and tech enthusiasts at the UK Tech Expo 2025 — the country's leading event for showcasing breakthrough technologies, digital transformation, and the future of industry. Over three days, explore more than 150 exhibitors, attend keynote sessions by global tech leaders, and participate in hands-on workshops designed to empower the next generation of digital talent. Whether you're interested in AI, sustainability, fintech, or cybersecurity, this event offers insights, networking, and inspiration for everyone in the tech ecosystem.",
                "start_time": "2025-10-14T09:00:00Z",
                "end_time": "2025-10-16T17:00:00Z",
                "timezone": "Europe/London",
                "venue_id": 2,
                "is_online": false,
                "host_id": 2,
                "event_type": "expo",
                "capacity": 800,
                "attendees_count": 545,
                "is_free": false,
                "price": 99.00,
                "event_image_url": "https://example.co.uk/images/uktechexpo2025.jpg",
                "is_published": true,
                "created_at": "2025-05-10T10:00:00.000Z",
            }
            expect(event).toMatchObject(expectedOutput);
            expect(event).toHaveProperty("last_updated_at", expect.any(String));
        });
    });
    test("200: responds with the updated event object when all valid event columns are amended, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/events/update/3")
        .send({
            "title": "AgriTech Innovation Forum 2025",
            "event_overview": "A 2-day forum exploring the intersection of agriculture and cutting-edge technology.",
            "description": "The AgriTech Innovation Forum 2025 brings together farmers, agronomists, tech developers, investors, and policymakers to explore how technology is transforming global agriculture. From precision farming and autonomous machinery to climate-smart practices and agri-robotics, this event showcases innovations that improve yields, reduce environmental impact, and build resilient food systems. Attendees can engage in live demos, breakout sessions, and strategic panels led by thought leaders in sustainable agriculture.",
            "start_time": "2025-08-12T09:00:00Z",
            "end_time": "2025-08-13T17:30:00Z",
            "timezone": "Europe/Paris",
            "venue_id": 2,
            "is_online": false,
            "event_type": "forum",
            "capacity": 1200,
            "is_free": false,
            "price": 120.00,
            "event_image_url": "https://example.co.uk/images/agritechforum2025.jpg",
            "is_published": true,
        })
        .expect(200)
        .then(({ body: { event } } : { body: CustomResponse }) => {
            const expectedOutput = {
                "event_id": 3,
                "title": "AgriTech Innovation Forum 2025",
                "slug": "agritech-innovation-forum-2025",
                "event_overview": "A 2-day forum exploring the intersection of agriculture and cutting-edge technology.",
                "description": "The AgriTech Innovation Forum 2025 brings together farmers, agronomists, tech developers, investors, and policymakers to explore how technology is transforming global agriculture. From precision farming and autonomous machinery to climate-smart practices and agri-robotics, this event showcases innovations that improve yields, reduce environmental impact, and build resilient food systems. Attendees can engage in live demos, breakout sessions, and strategic panels led by thought leaders in sustainable agriculture.",
                "start_time": "2025-08-12T09:00:00Z",
                "end_time": "2025-08-13T17:30:00Z",
                "timezone": "Europe/Paris",
                "venue_id": 2,
                "is_online": false,
                "host_id": 4,
                "event_type": "forum",
                "capacity": 1200,
                "attendees_count": 775,
                "is_free": false,
                "price": 120.00,
                "event_image_url": "https://example.co.uk/images/agritechforum2025.jpg",
                "is_published": true,
                "created_at": "2025-05-01T09:00:00.000Z",
            }
            expect(event).toMatchObject(expectedOutput);
            expect(event).toHaveProperty("last_updated_at", expect.any(String));
        });
    });
    test("400: responds with an appropriate status code and error message when the request body does not contain any fields", () => {
        return request(app)
        .patch("/api/events/update/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
    test("400: responds with an appropriate status code and error message when one or more fields of the request body is passed an invalid data type", () => {
        return request(app)
        .patch("/api/events/update/1")
        .send({
            "capacity": "one thousand"
        })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid 'event_id'", () => {
        return request(app)
        .patch("/api/events/update/three")
        .send({ "is_published": true })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent 'event_id'", () => {
        return request(app)
        .patch("/api/events/update/45")
        .send({ "capacity": 1234 })
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Event not found.");
        });
    });
});

describe("PATCH /api/users/:user_id", () => {
    test("200: responds with an updated user object when a single user column is amended, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/users/1")
        .send({
            "bio": "I LOVE TECH! Always looking to meet cool tech peeps!"
        })
        .expect(200)
        .then(({ body: { user } } : { body: CustomResponse }) => {
            const expectedOutput = {
                "user_id": 1,
                "name": "Alice Thompson",
                "username": "alice_thompson123",
                "email": "alice.thompson@example.com",
                "password_hash": "$2b$10$J4lkqkGcN9MbH1E4ytQsE.8QZB/UO1w8hPbmC34RhOeSkqJK9sFhi",
                "role": "attendee",
                "created_at": "2025-05-01T09:00:00.000Z",
                "bio": "I LOVE TECH! Always looking to meet cool tech peeps!",
                "avatar_url": "https://example.com/avatars/alice.jpg"
            }
            expect(user).toMatchObject(expectedOutput);
            expect(user).toHaveProperty("last_updated_at", expect.any(String));
        });
    });
    test("200: responds with an updated user object when multiple user columns are amended, as well as an appropriate status code", () => {
        return request(app)
        .patch("/api/users/1")
        .send({
            "name": "Scott Girling",
            "username": "scottgirling123",
            "email": "scott@yahoo.com",
            "password_hash": "password_hash",
            "bio": "A software developer looking to find cool tech events near me!",
            "avatar_url": "https://example.com/avatars/scott.jpg"
        })
        .expect(200)
        .then(({ body: { user } } : { body: CustomResponse }) => {
            const expectedOutput = {
                "user_id": 1,
                "name": "Scott Girling",
                "username": "scottgirling123",
                "email": "scott@yahoo.com",
                "password_hash": "password_hash",
                "role": "attendee",
                "created_at": "2025-05-01T09:00:00.000Z",
                "bio": "A software developer looking to find cool tech events near me!",
                "avatar_url": "https://example.com/avatars/scott.jpg"
            }
            expect(user).toMatchObject(expectedOutput);
            expect(user).toHaveProperty("last_updated_at", expect.any(String));
        });
    });
    test("400: responds with an appropriate status code and error message when the request body does not contain any fields", () => {
        return request(app)
        .patch("/api/users/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
    test("400: responds with an appropriate status code and error message when passed an invalid 'user_id'", () => {
        return request(app)
        .patch("/api/users/one")
        .send({
            "bio": "I LOVE TECH! Always looking to meet cool tech peeps!"
        })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent 'user_id'", () => {
        return request(app)
        .patch("/api/users/37")
        .send({
            "bio": "I LOVE TECH! Always looking to meet cool tech peeps!"
        })
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Profile not found.");
        });
    });
});

describe("DELETE /api/events/:event_id", () => {
    test("200: removes the event object of the given 'event_id' and responds with an appropriate status code", () => {
        return request(app)
        .delete("/api/events/1")
        .expect(204)
    });
    test("400: responds with an appropriate status code and error message when passed an invalid id", () => {
        return request(app)
        .delete("/api/events/one")
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
    test("404: responds with an appropriate status code and error message when passed a valid but non-existent id", () => {
        return request(app)
        .delete("/api/events/101")
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Event not found.");
        });
    });
});

describe("POST /api/user_events", () => {
    test("201: responds with the newly created user-event entry, as well as an appropriate status code", () => {
        return request(app)
        .post("/api/user_events")
        .send({ user_id: 1, event_id: 4 })
        .expect(201)
        .then(({ body: { userEvent } } : { body: CustomResponse }) => {
            expect(userEvent).toHaveProperty("user_id", 1)
            expect(userEvent).toHaveProperty("event_id", 4);
        });
    });
    test("400: responds with an appropriate status code and error message when the request body does not contain the correct fields", () => {
        return request(app)
        .post("/api/user_events")
        .send({})
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
    test("404: responds with an appropriate status code and error message when the request body contains a valid but non-existent user or event id", () => {
        return request(app)
        .post("/api/user_events")
        .send({ user_id: 1, event_id: 44 })
        .expect(404)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("User or event not found.");
        });
    });
});

describe("POST /api/events", () => {
    test("201: responds with the newly created event, with the appropriate properties and status code", () => {
        return request(app)
        .post("/api/events")
        .send({
            "title": "AgriTech Innovation Forum 2025",
            "slug": "agritech-innovation-forum-2025",
            "event_overview": "A 2-day forum exploring the intersection of agriculture and cutting-edge technology.",
            "description": "The AgriTech Innovation Forum 2025 brings together farmers, agronomists, tech developers, investors, and policymakers to explore how technology is transforming global agriculture. From precision farming and autonomous machinery to climate-smart practices and agri-robotics, this event showcases innovations that improve yields, reduce environmental impact, and build resilient food systems. Attendees can engage in live demos, breakout sessions, and strategic panels led by thought leaders in sustainable agriculture.",
            "start_time": "2025-08-12T09:00:00Z",
            "end_time": "2025-08-13T17:30:00Z",
            "timezone": "Europe/London",
            "venue_id": 3,
            "is_online": false,
            "host_id": 2,
            "event_type": "forum",
            "capacity": 600,
            "is_free": false,
            "price": 120.00,
            "event_image_url": "https://example.co.uk/images/agritechforum2025.jpg",
            "is_published": true,
        })
        .then(({ body: { event } } : { body: CustomResponse }) => {
            expect(event).toHaveProperty("event_id", 6);
            expect(event).toHaveProperty("title", "AgriTech Innovation Forum 2025");
            expect(event).toHaveProperty("slug", "agritech-innovation-forum-2025");
            expect(event).toHaveProperty("event_overview", "A 2-day forum exploring the intersection of agriculture and cutting-edge technology.");
            expect(event).toHaveProperty("description", "The AgriTech Innovation Forum 2025 brings together farmers, agronomists, tech developers, investors, and policymakers to explore how technology is transforming global agriculture. From precision farming and autonomous machinery to climate-smart practices and agri-robotics, this event showcases innovations that improve yields, reduce environmental impact, and build resilient food systems. Attendees can engage in live demos, breakout sessions, and strategic panels led by thought leaders in sustainable agriculture.");
            expect(event).toHaveProperty("start_time", "2025-08-12T09:00:00Z");
            expect(event).toHaveProperty("end_time", "2025-08-13T17:30:00Z");
            expect(event).toHaveProperty("timezone", "Europe/London");
            expect(event).toHaveProperty("venue_id", 3);
            expect(event).toHaveProperty("is_online", false);
            expect(event).toHaveProperty("host_id", 2);
            expect(event).toHaveProperty("event_type", "forum");
            expect(event).toHaveProperty("capacity", 600);
            expect(event).toHaveProperty("attendees_count", 0);
            expect(event).toHaveProperty("is_free", false);
            expect(event).toHaveProperty("price", 120.00);
            expect(event).toHaveProperty("event_image_url", "https://example.co.uk/images/agritechforum2025.jpg");
            expect(event).toHaveProperty("is_published", true);
            expect(event).toHaveProperty("created_at", expect.any(String));
            expect(event).toHaveProperty("last_updated_at", expect.any(String));
            expect(Object.entries(event).length).toBe(20);
        });
    });
    test("400: responds with an appropriate status code and error message when the request body does not contain the correct fields", () => {
        return request(app)
        .post("/api/events")
        .send({
            "venue_id": 3,
            "is_online": false,
            "host_id": 2,
            "event_type": "forum",
            "capacity": 600,
            "is_free": false,
            "price": 120.00,
            "event_image_url": "https://example.co.uk/images/agritechforum2025.jpg",
            "is_published": true
        })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
    test("400: responds with an appropriate status code and error message when the request body contains the correct fields but one or more fields contain an invalid data type", () => {
        return request(app)
        .post("/api/events")
        .send({
            "title": "AgriTech Innovation Forum 2025",
            "slug": "agritech-innovation-forum-2025",
            "event_overview": "A 2-day forum exploring the intersection of agriculture and cutting-edge technology.",
            "description": "The AgriTech Innovation Forum 2025 brings together farmers, agronomists, tech developers, investors, and policymakers to explore how technology is transforming global agriculture. From precision farming and autonomous machinery to climate-smart practices and agri-robotics, this event showcases innovations that improve yields, reduce environmental impact, and build resilient food systems. Attendees can engage in live demos, breakout sessions, and strategic panels led by thought leaders in sustainable agriculture.",
            "start_time": "2025-08-12T09:00:00Z",
            "end_time": "2025-08-13T17:30:00Z",
            "timezone": "Europe/London",
            "venue_id": 3,
            "is_online": "not sure",
            "host_id": 2,
            "event_type": "forum",
            "capacity": 600,
            "is_free": false,
            "price": 120.00,
            "event_image_url": "https://example.co.uk/images/agritechforum2025.jpg",
            "is_published": true,
        })
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid data type.");
        });
    });
});

describe("POST /api/users", () => {
    test("201: responds with the newly created user, with the appropriate properties and status code", () => {
        return request(app)
        .post("/api/users")
        .send({
            "name": "Scott Girling",
            "username": "scottgirling123",
            "email": "scott@yahoo.com",
            "password_hash": "password_hash",
            "bio": "A software developer looking to find cool tech events near me!",
            "role": "attendee"
        })
        .expect(201)
        .then(({ body: { user } } : { body: CustomResponse }) => {
            expect(user).toHaveProperty("user_id", 6);
            expect(user).toHaveProperty("name", "Scott Girling");
            expect(user).toHaveProperty("username", "scottgirling123");
            expect(user).toHaveProperty("email", "scott@yahoo.com");
            expect(user).toHaveProperty("password_hash", "password_hash");
            expect(user).toHaveProperty("bio", "A software developer looking to find cool tech events near me!");
            expect(user).toHaveProperty("avatar_url", null);
            expect(user).toHaveProperty("role", "attendee");
            expect(user).toHaveProperty("created_at", expect.any(String));
            expect(user).toHaveProperty("last_updated_at", expect.any(String));
            expect(Object.entries(user).length).toBe(10);
        });
    });
    test("400: responds with an appropriate status code and error messafe when the request body does not contain the correct fields", () => {
        return request(app)
        .post("/api/users")
        .send({})
        .expect(400)
        .then(({ body: { msg } } : { body: CustomResponse }) => {
            expect(msg).toBe("Invalid request - missing field(s).");
        });
    });
});