const db = require("../db/connection");

const selectUserEventsById = (user_id: number) => {
    return db.query("SELECT * FROM user_events WHERE user_id = $1", [user_id])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}

module.exports = selectUserEventsById;