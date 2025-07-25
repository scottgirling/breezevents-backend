import db from "../db/connection";

export const selectTags = () => {
    return db.query("SELECT * FROM tags")
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}