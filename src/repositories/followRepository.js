import { connection } from "../database/db.js";

const getFollowers = async (userId) => {
    return await connection.query(`
      SELECT
         *
      FROM
         follows
      WHERE
         "followerId" = $1;`, [userId]);
};

const getFollower = async ({ userId, followedId }) => {
   return await connection.query(`
      SELECT
         *
      FROM
         follows
      WHERE
         "followerId" = $1
      AND "followedId" = $2;`, [userId, followedId]);
};

const getUserFollow = async (followedId) => {
   return await connection.query(`
      SELECT
         *
      FROM
         users
      WHERE
         id = $1;`, [followedId]);
};

const insertFollow = async ({ userId, followedId }) => {
   return await connection.query(`
      INSERT INTO
         follows ("followerId", "followedId")
      VALUES
         ($1, $2);`, [userId, followedId]);
};

const deleteFollow = async ({ userId, followedId }) => {
   return await connection.query(`
      DELETE FROM 
         follows 
      WHERE 
         "followerId"=$1 
      AND "followedId"=$2;`, [userId, followedId]);
};

export { getFollowers, getFollower, getUserFollow, insertFollow, deleteFollow };