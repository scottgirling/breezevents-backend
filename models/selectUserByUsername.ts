const db = require("../db/connection");

const selectUserByUsername = (username: string) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "User does not exist." });
        }
        return rows[0];
    });
}

module.exports = selectUserByUsername;