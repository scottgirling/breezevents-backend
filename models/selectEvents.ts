const db = require("../db/connection");
const checkTagExists = require("./utils/checkTagExists");

const selectEvents = (sort_by: string = "start_time", order: string = "asc", tag: string, is_online: string, is_free: string, limit: number = 12, p: number = 1) => {
    const validSortBy = ["start_time", "price", "created_at"];
    const validOrder = ["asc", "desc"];
    let filterQueries = [];

    if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid 'Sort By' or 'Order' query." });
    }

    let sqlQuery = `SELECT events.* FROM events`;
    
    if (!tag) {
        if (is_online && is_free) {
            filterQueries.push(is_online, is_free);
            sqlQuery += ` WHERE events.is_online = $1 AND events.is_free = $2`;
        } else if (is_online) {
            filterQueries.push(is_online);
            sqlQuery += ` WHERE events.is_online = $1`;
        } else if (is_free) {
            filterQueries.push(is_free);
            sqlQuery += ` WHERE events.is_free = $1`;
        }

        sqlQuery += ` ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${((p - 1) * limit)}`;
        return db.query(sqlQuery, filterQueries)
        .then(({ rows } : { rows: Array<object> }) => {
            if (p > 1 && !rows.length) {
                return Promise.reject({ status: 404, msg: "Page does not exist." });
            }
            return rows;
        });
    }

    if (tag) {
        return checkTagExists(tag)
        .then(() => {
            filterQueries.push(tag);
            sqlQuery += ` JOIN event_tags ON events.event_id = event_tags.event_id JOIN tags ON event_tags.tag_id = tags.tag_id WHERE tags.slug = $1`;

            if (is_online && is_free) {
                filterQueries.push(is_online, is_free);
                sqlQuery += ` AND events.is_online = $2 AND events.is_free = $3`;
            } else if (is_online) {
                filterQueries.push(is_online);
                sqlQuery += ` AND events.is_online = $2`;
            } else if (is_free) {
                filterQueries.push(is_free);
                sqlQuery += ` AND events.is_free = $2`;
            }

            sqlQuery += ` ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${((p - 1) * limit)}`;
            return db.query(sqlQuery, filterQueries)
        })
        .then(({ rows } : { rows: Array<object> }) => {
            if (p > 1 && !rows.length) {
                return Promise.reject({ status: 404, msg: "Page does not exist." });
            }
            return rows;
        });
    }
}

module.exports = selectEvents;