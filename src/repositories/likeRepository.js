import { connection } from "../database/db.js";

const insertLike = async (userId, postId) => {
  return await connection.query(
    `INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
    [userId, postId]
  );
};

const deleteLike = async (postId, userId) => {
  return await connection.query(
    `DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`,
    [postId, userId]
  );
};

const listLikes = async (postId) => {
  return await connection.query(
    `SELECT 
    COUNT(likes.id) AS "likeCount", 
    users.name AS name,
    likes."userId" AS userId 
    FROM likes 
    JOIN users ON likes."userId" = users.id 
    JOIN posts ON likes."postId" = posts.id
    WHERE posts.id = $1
    GROUP BY users.name, likes."userId";`,
    [postId]
  );
};

const countLikes = async (postId) => {
  return await connection.query(
    `SELECT COUNT(id) FROM likes WHERE likes."postId" = $1;`,
    [postId]
  );
};

const getUserLikes = async (userId, postId) => {
  return await connection.query(
    `SELECT "userId" FROM likes WHERE likes."userId" = $1 AND likes."postId" = $2;`,
    [userId, postId]
  );
};

const deleteUserLike = async (postId, userId) => {
  return await connection.query(
    `DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`,
    [postId, userId]
  );
};

export {
  insertLike,
  deleteLike,
  listLikes,
  countLikes,
  getUserLikes,
  deleteUserLike,
};
