const db = require("../db/connection");

const addUserEvent = (user_id: number, event_id: number) => {
    console.log(user_id, event_id)
    return db.query("INSERT INTO user_events (user_id, event_id) VALUES ($1, $2) RETURNING *", [user_id, event_id])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    });
}

module.exports = addUserEvent;