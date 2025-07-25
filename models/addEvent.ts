import db from "../db/connection";

export const addEvent = (title: string, slug: string, event_overview: string, description: string, start_time: string, end_time: string, timezone: string, venue_id: number, is_online: boolean, host_id: number, event_type: string, capacity: number, is_free: boolean, price: number, event_image_url: string, is_published: boolean) => {
    return db.query("INSERT INTO events (title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, is_free, price, event_image_url, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *", [title, slug, event_overview, description, start_time, end_time, timezone, venue_id, is_online, host_id, event_type, capacity, is_free, price, event_image_url, is_published])
    .then(({ rows } : { rows: Array<object> }) => {
        return rows[0];
    });
}