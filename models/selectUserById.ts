import db from "../db/connection";

export const selectUserById = (user_id: string) => {
    return db.query("SELECT * FROM users WHERE user_id = $1", [user_id])
    .then(({ rows } : { rows: Array<object> }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "User does not exist." });
        }
        return rows[0];
    });
}