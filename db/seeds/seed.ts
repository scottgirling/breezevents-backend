const db = require("../connection");
const format = require("pg-format");

/*
{ eventTagData, eventData, tagData, userData, venueData } : { eventTagData: Array<Object>, eventData: Array<Object>, tagData: Array<Object>, userEventData: Array<Object>, userData: Array<Object>, venueData: Array<Object> }
 */

const seed = () => {
    return db.query("DROP TABLE IF EXISTS event_tags")
    .then(() => {
        return db.query("DROP TABLE IF EXISTS user_events");
    })
    .then(() => {
        return db.query("DROP TABLE IF EXISTS events");
    })
    .then(() => {
        return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
        return db.query("DROP TABLE IF EXISTS venues");
    })
    .then(() => {
        return db.query("DROP TABLE IF EXISTS tags");
    })
    .then(() => {
        const tagsTablePromise = db.query(`CREATE TABLE tags (
            tag_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            slug VARCHAR NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            last_updated_at TIMESTAMP DEFAULT NOW()
        )`)

        const venuesTablePromise = db.query(`CREATE TABLE venues (
            venue_id SERIAL PRIMARY KEY,
            venue_name VARCHAR NOT NULL,
            venue_type VARCHAR,
            location VARCHAR NOT NULL,
            capacity INT,
            facilities TEXT[],
            contact_email VARCHAR NOT NULL,
            contact_phone VARCHAR NOT NULL,
            website_url VARCHAR NOT NULL,
            event_types TEXT[],
            accessibility_features TEXT[],
            parking_info VARCHAR,
            image_gallery TEXT[],
            nearby_transport VARCHAR,
            created_at TIMESTAMP DEFAULT NOW(),
            last_updated_at TIMESTAMP DEFAULT NOW()
        )`)

        const usersTablePromise = db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            bio TEXT,
            avatar_url VARCHAR,
            role VARCHAR NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            last_updated_at TIMESTAMP DEFAULT NOW()
        )`)

        return Promise.all([tagsTablePromise, venuesTablePromise, usersTablePromise]);
    })
    .then(() => {
        return db.query(`CREATE TABLE events (
            event_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            slug VARCHAR NOT NULL,
            event_overview VARCHAR NOT NULL,
            description TEXT NOT NULL,
            start_time VARCHAR NOT NULL,
            end_time VARCHAR NOT NULL,
            timezone VARCHAR,
            venue_id INT references venues(venue_id) NOT NULL,
            is_online BOOLEAN NOT NULL,
            host_id INT REFERENCES users(user_id) NOT NULL,
            event_type VARCHAR NOT NULL,
            capacity INT NOT NULL,
            attendees_count INT DEFAULT 0 NOT NULL,
            is_free BOOLEAN NOT NULL,
            price INT,
            event_image_url VARCHAR,
            is_published BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            last_updated_at TIMESTAMP DEFAULT NOW()
        )`)
    })
    .then(() => {
        const userEventsTablePromise = db.query(`CREATE TABLE user_events (
            user_id INT NOT NULL,
            event_id INT NOT NULL,
            PRIMARY KEY (user_id, event_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
        )`)

        const eventTagsTablePromise = db.query(`CREATE TABLE event_tags (
            event_id INT NOT NULL,
            tag_id INT NOT NULL,
            PRIMARY KEY (event_id, tag_id),
            FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
        )`)

        return Promise.all([userEventsTablePromise, eventTagsTablePromise]);
    })
}

module.exports = seed;