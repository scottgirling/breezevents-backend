import db from "../db/connection";

export const updateEventById = (attendeeCountChange: number, event_id: string) => {
    return db.query("UPDATE events SET attendees_count = attendees_count + $1 WHERE event_id = $2 RETURNING *", [attendeeCountChange, event_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Profile not found." });
        }
        return rows[0];
    });
}