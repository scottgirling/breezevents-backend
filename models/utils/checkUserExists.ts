const db = require("../../db/connection");

const checkUserExists = (username: string) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Host not found." });
        }
    });
}

module.exports = checkUserExists;