const db = require("../db/connection");

const addUser = (name: string, username: string, email: string, password_hash: string, bio: string, avatar_url: string, role: string) => {
    return db.query("INSERT INTO users (name, username, email, password_hash, bio, avatar_url, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, username, email, password_hash, bio, avatar_url, role])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    })
}

module.exports = addUser;