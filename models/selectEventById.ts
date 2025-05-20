const db = require("../db/connection");

const selectEventById = (event_id: number) => {
    return db.query("SELECT * FROM events WHERE event_id = $1", [event_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Event does not exist." });
        }
        return rows[0];
    });
}

module.exports = selectEventById;