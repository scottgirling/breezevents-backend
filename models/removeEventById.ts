import db from "../db/connection";

export const removeEventById = (event_id: string) => {
    return db.query("DELETE FROM events WHERE event_id = $1 RETURNING *", [event_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Event not found." });
        }
    });
}