const db = require("../db/connection");
const checkUserExists = require("./utils/checkUserExists");

const selectEventsByUserId = (user_id: string) => {
    return checkUserExists(user_id)
    .then(() => {
        return db.query("SELECT events.* FROM events JOIN user_events ON events.event_id = user_events.event_id JOIN users on user_events.user_id = users.user_id WHERE users.user_id = $1", [user_id])
    })
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    })
}

module.exports = selectEventsByUserId;