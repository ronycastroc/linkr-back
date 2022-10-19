import { connection } from "../database/db.js";

export async function likePost(req, res) {
  try {
    await connection.query(
      `INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
      [userId, postId]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
