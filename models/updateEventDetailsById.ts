const db = require("../db/connection");

const updateEventDetailsById = (event_id: string, title: any, event_overview: string, description: string, start_time: string, end_time: string, timezone: string, venue_id: number, is_online: boolean, event_type: string, capacity: number, is_free: boolean, price: number, event_image_url: string, is_published: boolean) => {
    
    let queryValues = [];

    let sqlQuery = "UPDATE events SET last_updated_at = CURRENT_TIMESTAMP";

    if (title) {
        queryValues.push(title);
        sqlQuery += `, title = $${queryValues.length}`;
        const updatedSlug = title.toLowerCase().replaceAll(" ", "-");
        queryValues.push(updatedSlug);
        sqlQuery += `, slug = $${queryValues.length}`;
    }

    if (event_overview) {
        queryValues.push(event_overview);
        sqlQuery += `, event_overview = $${queryValues.length}`;
    }

    if (description) {
        queryValues.push(description);
        sqlQuery += `, description = $${queryValues.length}`;
    }

    if (start_time) {
        queryValues.push(start_time);
        sqlQuery += `, start_time = $${queryValues.length}`;
    }

    if (end_time) {
        queryValues.push(end_time);
        sqlQuery += `, end_time = $${queryValues.length}`;
    }

    if (timezone) {
        queryValues.push(timezone);
        sqlQuery += `, timezone = $${queryValues.length}`;
    }

    if (venue_id) {
        queryValues.push(venue_id);
        sqlQuery += `, venue_id = $${queryValues.length}`;
    }

    if (is_online !== undefined) {
        queryValues.push(is_online);
        sqlQuery += `, is_online = $${queryValues.length}`;
    }

    if (event_type) {
        queryValues.push(event_type);
        sqlQuery += `, event_type = $${queryValues.length}`;
    }

    if (capacity) {
        queryValues.push(capacity);
        sqlQuery += `, capacity = $${queryValues.length}`;
    }

    if (is_free !== undefined) {
        queryValues.push(is_free);
        sqlQuery += `, is_free = $${queryValues.length}`;
    }

    if (price) {
        queryValues.push(price);
        sqlQuery += `, price = $${queryValues.length}`;
    }

    if (event_image_url) {
        queryValues.push(event_image_url);
        sqlQuery += `, event_image_url = $${queryValues.length}`;
    }

    if (is_published) {
        queryValues.push(is_published);
        sqlQuery += `, is_published = $${queryValues.length}`;
    }

    if (!queryValues.length) {
        return Promise.reject({ status: 400, msg: "Invalid request - missing field(s)." });
    }

    queryValues.push(event_id);
    sqlQuery += ` WHERE event_id = $${queryValues.length} RETURNING *`;

    return db.query(sqlQuery, queryValues)
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Event not found." });
        }
        return rows[0];
    });
}

module.exports = updateEventDetailsById;