const db = require("../db/connection");

const selectUserEvents = () => {
    return db.query("SELECT * FROM user_events")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}

module.exports = selectUserEvents;