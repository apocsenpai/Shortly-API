import db from "../database/database.connection.js";

export async function createSession({ userId, token }) {
  return await db.query(
    `INSERT INTO sessions ("userId", token)
    VALUES ($1, $2)`,
    [userId, token]
  );
}
