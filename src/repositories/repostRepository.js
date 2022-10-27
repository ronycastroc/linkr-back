import { connection } from "../database/db.js";

const insertRepost = async (userId, postId, name) => {
  return await connection.query(
    `INSERT INTO reposts ("userId", "postId", "reposterName") VALUES ($1, $2, $3);`,
    [userId, postId, name]
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
const getReposts = async () => {
  return (
    await connection.query(`
    SELECT posts.*,users."urlImage",users.name,reposts."userId" as "reposterId", reposts."reposterName"
    FROM posts
    JOIN users ON users.id=posts."userId"
    JOIN reposts ON posts.id=reposts."postId"
    ORDER BY "createAt" DESC LIMIT 20;
  `)
  ).rows;
};

export { insertRepost, countReposts, listReposts, getReposts };
