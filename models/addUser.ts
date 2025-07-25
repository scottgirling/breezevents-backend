import db from "../db/connection";

export const addUser = (user_id: string, name: string, username: string, email: string, bio: string, avatar_url: string, role: string) => {
    return db.query("INSERT INTO users (user_id, name, username, email, bio, avatar_url, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [user_id, name, username, email, bio, avatar_url, role])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    })
}