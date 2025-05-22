const db = require("../db/connection");
const checkUserExists = require("../models/utils/checkUserExists");

const selectEventsByHostUsername = (username: string) => {
    return checkUserExists(username)
    .then(() => {
        return db.query("SELECT events.*, users.username AS host FROM events JOIN users ON events.host_id = users.user_id WHERE users.username = $1", [username])
    })
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}

module.exports = selectEventsByHostUsername;