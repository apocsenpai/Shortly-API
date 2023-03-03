import db from "../database/database.connection.js";

export async function findAllUrlDataGroupedByUserId() {
  return await db.query(
    `SELECT us.id, us.name,
    COUNT(ur."userId") AS "linksCount",
    COALESCE(SUM(ur."visitCount"),0) AS "visitCount"
    FROM users us
    LEFT JOIN urls ur ON ur."userId" = us.id
    GROUP BY us.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `
  );
}
