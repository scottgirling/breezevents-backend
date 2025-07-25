import db from "../db/connection";
import { checkUserExists } from "./utils/checkUserExists";

export const selectEventsByHostId = (user_id: string) => {
    return checkUserExists(user_id)
    .then(() => {
        return db.query("SELECT events.*, users.username AS host FROM events JOIN users ON events.host_id = users.user_id WHERE users.user_id = $1", [user_id])
    })
    .then(({ rows } : { rows: Array<object> }) => {
        return rows;
    });
}