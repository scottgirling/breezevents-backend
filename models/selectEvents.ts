const db = require("../db/connection");

const selectEvents = () => {
    return db.query("SELECT * FROM events")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    })
}

module.exports = selectEvents;