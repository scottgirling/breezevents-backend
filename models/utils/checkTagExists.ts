const db = require("../../db/connection");

const checkTagExists = (tag: string) => {
    return db.query("SELECT * FROM tags WHERE slug = $1", [tag])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Tag does not exist." });
        }
    });
}

module.exports = checkTagExists;