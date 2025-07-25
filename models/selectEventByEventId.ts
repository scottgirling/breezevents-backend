import db from "../db/connection";

export const selectEventByEventId = (event_id: number) => {
    return db.query("SELECT events.*, venues.*, users.name, users.email, users.bio FROM events JOIN venues ON events.venue_id = venues.venue_id JOIN users ON events.host_id = users.user_id WHERE events.event_id = $1", [event_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Event does not exist." });
        }
        return rows[0];
    });
}