import db from "../database/database.connection.js";

export async function createShortUrl({ userId, url, shortUrl }) {
  return db.query(
    `INSERT INTO urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
}
