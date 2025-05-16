const db = require("../connection");
const format = require("pg-format");
import { EventTag } from "../data/test-data/event_tags";
import { Event } from "../data/test-data/events";
import { Tag } from "../data/test-data/tags";
import { UserEvent } from "../data/test-data/user_events";
import { User } from "../data/test-data/users";
import { Venue } from "../data/test-data/venues";

const seed = ({ eventTagData, eventData, tagData, userEventData, userData, venueData } : { eventTagData: EventTag[], eventData: Event[], tagData: Tag[], userEventData: UserEvent[], userData: User[], venueData: Venue[] }) => {
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
            password_hash VARCHAR NOT NULL,
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
    .then(() => {
        const insertTagsQueryString = format(
            `INSERT INTO tags (name, slug, created_at, last_updated_at) VALUES %L`, tagData.map(({ name, slug, created_at, last_updated_at }) => [name, slug, created_at, last_updated_at])
        )
        const tagsPromise = db.query(insertTagsQueryString);
        
        const insertVenuesQueryString = format(
            `INSERT INTO venues (venue_name, venue_type, location, capacity, facilities, contact_email, contact_phone, website_url, event_types, accessibility_features, parking_info, image_gallery, nearby_transport, created_at, last_updated_at) VALUES %L`, venueData.map(({ venue_name, venue_type, location, capacity, facilities, contact_email, contact_phone, website_url, event_types, accessibility_features, parking_info, image_gallery, nearby_transport, created_at, last_updated_at }) => [venue_name, venue_type, location, capacity, (`{${facilities}}`), contact_email, contact_phone, website_url, (`{${event_types}}`), (`{${accessibility_features}}`), parking_info, (`{${image_gallery}}`), nearby_transport, created_at, last_updated_at])
        )
        const venuesPromise = db.query(insertVenuesQueryString);

        const insertUsersQueryString = format(
            `INSERT INTO users (name, email, password_hash, role, created_at, last_updated_at, bio, avatar_url) VALUES %L`, userData.map(({ name, email, password_hash, role, created_at, last_updated_at, bio, avatar_url }) => [ name, email, password_hash, role, created_at, last_updated_at, bio, avatar_url])
        )
        const usersPromise = db.query(insertUsersQueryString);

        return Promise.all([tagsPromise, venuesPromise, usersPromise]);
    })
    .then(() => {
        const insertEventsQueryString = format(
            `INSERT INTO events (title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, attendees_count, is_free, price, event_image_url, is_published, created_at, last_updated_at) VALUES %L`, eventData.map(({ title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, attendees_count, is_free, price, event_image_url, is_published, created_at, last_updated_at }) => [title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, attendees_count, is_free, price, event_image_url, is_published, created_at, last_updated_at])
        )
        return db.query(insertEventsQueryString);
    })
    .then(() => {
        const insertEventTagsQueryString = format(
            `INSERT INTO event_tags (event_id, tag_id) VALUES %L`, eventTagData.map(({ event_id, tag_id }) => [event_id, tag_id])
        )
        const eventTagsPromise = db.query(insertEventTagsQueryString);

        const insertUserEventsQueryString = format(
            `INSERT INTO user_events (user_id, event_id) VALUES %L`, userEventData.map(({ user_id, event_id }) => [user_id, event_id])
        )
        const userEventsPromise = db.query(insertUserEventsQueryString);

        return Promise.all([eventTagsPromise, userEventsPromise]);
    })
}

module.exports = seed;