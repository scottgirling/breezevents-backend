const db = require("../db/connection");

const selectVenues = () => {
    return db.query("SELECT * FROM venues")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}

module.exports = selectVenues;