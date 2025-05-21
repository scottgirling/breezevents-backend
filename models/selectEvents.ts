const db = require("../db/connection");
const checkTagExists = require("./utils/checkTagExists");

const selectEvents = (sort_by: string = "start_time", order: string = "asc", tag: string, is_online: string, is_free: string) => {
    const validSortBy = ["start_time", "price", "created_at"];
    const validOrder = ["asc", "desc"];
    let filterQueries = [];

    if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid 'Sort By' or 'Order' query." });
    }

    if (!tag) {
        let sqlQuery = `SELECT * FROM events`;
        if (is_online && is_free) {
            filterQueries.push(is_online);
            filterQueries.push(is_free);
            sqlQuery += ` WHERE events.is_online = $1 AND events.is_free = $2`;
        } else if (is_online) {
            filterQueries.push(is_online);
            sqlQuery += ` WHERE events.is_online = $1`;
        } else if (is_free) {
            filterQueries.push(is_free);
            sqlQuery += ` WHERE events.is_free = $1`;
        }
        sqlQuery += ` ORDER BY ${sort_by} ${order}`;
        return db.query(sqlQuery, filterQueries)
        .then(({ rows } : { rows: Array<object> }) => {
            return rows;
        })
    }

    if (tag) {
        return checkTagExists(tag)
        .then(() => {
            let sqlQuery = `SELECT events.* FROM event_tags JOIN events ON event_tags.event_id = events.event_id JOIN tags ON event_tags.tag_id = tags.tag_id`;

            filterQueries.push(tag);
            sqlQuery += ` WHERE tags.slug = $1`;

            if (is_online && is_free) {
                filterQueries.push(is_online);
                filterQueries.push(is_free);
                sqlQuery += ` AND events.is_online = $2 AND events.is_free = $3`;
            } else if (is_online) {
                filterQueries.push(is_online);
                sqlQuery += ` AND events.is_online = $2`;
            } else if (is_free) {
                filterQueries.push(is_free);
                sqlQuery += ` AND events.is_free = $2`;
            }

            sqlQuery += ` ORDER BY ${sort_by} ${order}`;
            return db.query(sqlQuery, filterQueries)
        })
        .then(({ rows }: { rows: Array<object> }) => {
            return rows;
        });
    }
}

module.exports = selectEvents;