const db = require("../db/connection");
const checkUserExists = require("./utils/checkUserExists");

const selectEventsByUsername = (username: string) => {
    return checkUserExists(username)
    .then(() => {
        return db.query("SELECT events.* FROM events JOIN user_events ON events.event_id = user_events.event_id JOIN users on user_events.user_id = users.user_id WHERE users.username = $1", [username])
    })
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    })
}

module.exports = selectEventsByUsername;