import db from "../db/connection";

export const selectVenueById = (venue_id: string) => {
    return db.query("SELECT * FROM venues WHERE venue_id = $1", [venue_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if(!rows.length) {
            return Promise.reject({ status: 404, msg: "Venue not found." });
        }
        return rows[0];
    });
}