const db = require("../db/connection");
const checkTagExists = require("./utils/checkTagExists");

const selectEvents = (sort_by: string = "start_time", order: string = "asc", tag: string, is_online: string, is_free: string, limit: number = 12, p: number = 1) => {
    const offset = (p - 1) * limit;
    const validSortBy = ["start_time", "price", "created_at"];
    const validOrder = ["asc", "desc"];
    let filterQueries = [];

    if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid 'Sort By' or 'Order' query." });
    }

    let sqlQuery = `SELECT DISTINCT events.* FROM events JOIN event_tags ON events.event_id = event_tags.event_id JOIN tags ON event_tags.tag_id = tags.tag_id WHERE events.is_published = 'true'`;

    if (tag) {
        filterQueries.push(tag);
        sqlQuery += ` AND tags.slug = $${filterQueries.length}`;
    }

    if (is_online) {
        filterQueries.push(is_online);
        sqlQuery += ` AND events.is_online = $${filterQueries.length}`;
    }

    if (is_free) {
        filterQueries.push(is_free)
        sqlQuery += ` AND events.is_free = $${filterQueries.length}`;
    }


    sqlQuery += ` ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset}`;

    return db.query(sqlQuery, filterQueries)
    .then(({ rows } : { rows: Array<object> }) => {
        if (p > 1 && !rows.length) {
            return Promise.reject({ status: 404, msg: "Page does not exist." });
        }
        return rows;
    });
}

module.exports = selectEvents;