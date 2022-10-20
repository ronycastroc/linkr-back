import { connection } from "../database/db.js";

const getPost = async (postId) => {
  return await connection.query(`SELECT * FROM posts WHERE id = $1;`, [postId]);
};

const deletePost = async (postId) => {
  return await connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
};

export { deletePost, getPost };
