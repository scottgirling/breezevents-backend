import db from "../db/connection";

export const selectVenues = () => {
    return db.query("SELECT * FROM venues")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}