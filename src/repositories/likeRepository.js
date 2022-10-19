import { connection } from "../database/db.js";

const insertLike = async (userId, postId) => {
  return await connection.query(
    `INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
    [userId, postId]
  );
};

const deleteLike = async (postId) => {
  return await connection.query(`DELETE FROM likes WHERE "postId" = $1;`, [
    postId,
  ]);
};

const listLikes = async (postId) => {
  return await connection.query(
    `SELECT COUNT(likes.id) AS "likeCount", users.name AS name FROM likes JOIN users ON likes."userId" = users.id JOIN posts ON likes."postId" = $1;`,
    [postId]
  );
};

const getPost = async (postId) => {
  return await connection.query(`SELECT * FROM posts WHERE id = $1;`, [postId]);
};

export { insertLike, deleteLike, listLikes, getPost };
