import { connection } from "../database/db.js";

const insertRepost = async (userId, postId) => {
  return await connection.query(
    `INSERT INTO reposts ("userId", "postId") VALUES ($1, $2);`,
    [userId, postId]
  );
};

const countReposts = async (postId) => {
  return await connection.query(
    `SELECT COUNT(id) FROM reposts WHERE reposts."postId" = $1;`,
    [postId]
  );
};

const listReposts = async (postId) => {
  return await connection.query(
    `SELECT 
      COUNT(reposts.id) AS "respostCount", 
      users.name AS name,
      reposts."userId" AS userId 
      FROM reposts 
      JOIN users ON reposts."userId" = users.id 
      JOIN posts ON reposts."postId" = posts.id
      WHERE posts.id = $1
      GROUP BY users.name, reposts."userId";`,
    [postId]
  );
};

export { insertRepost, countReposts, listReposts };
