import db from "../db/connection";
import { checkUserExists } from "./utils/checkUserExists";

export const updateUserById = (user_id: string, name: string, username: string, email: string, bio: string, avatar_url: string) => {
    return checkUserExists(user_id)
    .then(() => {
        let queryValues = [];
    
        let sqlQuery = "UPDATE users SET user_last_updated_at = CURRENT_TIMESTAMP";
    
        if (name) {
            queryValues.push(name);
            sqlQuery += `, name = $${queryValues.length}`;
        }
    
        if (username) {
            queryValues.push(username);
            sqlQuery += `, username = $${queryValues.length}`;
        }
    
        if (email) {
            queryValues.push(email);
            sqlQuery += `, email = $${queryValues.length}`;
        }
    
        if (bio) {
            queryValues.push(bio);
            sqlQuery += `, bio = $${queryValues.length}`;
        }
    
        if (avatar_url) {
            queryValues.push(avatar_url);
            sqlQuery += `, avatar_url = $${queryValues.length}`;
        }
    
        if (!queryValues.length) {
            return Promise.reject({ status: 400, msg: "Invalid request - missing field(s)." });
        }

        queryValues.push(user_id)
        sqlQuery += ` WHERE user_id = $${queryValues.length} RETURNING *`;
    
        return db.query(sqlQuery, queryValues)
    })
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    });
}