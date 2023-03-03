import db from "../database/database.connection.js";

export async function findUserByEmail(email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function createUser({ name, email, hashedPassword }) {
  return await db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
  );
}
