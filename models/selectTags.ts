const db = require("../db/connection");

const selectTags = () => {
    return db.query("SELECT * FROM tags")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}

module.exports = selectTags;