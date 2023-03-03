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

export async function findUserAndUrlByUserId(id) {
  return await db.query(
    `
  SELECT us.id, us.name, ur.id AS "urlId", ur.*
  FROM users us
  INNER JOIN urls ur ON us.id = ur."userId"
  WHERE us.id = $1
  `,
    [id]
  );
}
