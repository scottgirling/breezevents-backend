import db from "../db/connection";

export const addEventTag = (event_id: string, tag_id: string) => {
    return db.query("INSERT INTO event_tags (event_id, tag_id) VALUES ($1, $2) RETURNING *", [event_id, tag_id])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    });
}