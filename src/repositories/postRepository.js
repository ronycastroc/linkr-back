import { connection } from "../database/db.js";

const getPost = async (postId) => {
  return await connection.query(`SELECT * FROM posts WHERE id = $1;`, [postId]);
};

const deletePost = async (postId) => {
  return await connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
};

const updatePost = async (newText, postId) => {
  return await connection.query(`UPDATE posts SET text = $1 WHERE id = $2;`, [
    newText,
    postId,
  ]);
};

export { deletePost, getPost, updatePost };
