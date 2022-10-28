import { connection } from "../database/db.js";

const getPost = async (postId) => {
    return (await connection.query(`SELECT * FROM posts WHERE id= $1;`,[postId])).rows
};

const getComments = async (postId)=>{
    return (await connection.query(`SELECT comments.*, users.name, users."urlImage", posts."userId" AS "postOwnerId"
    FROM comments JOIN users on comments."userId"=users.id JOIN posts ON comments."postId"=posts.id
    WHERE comments."postId" = $1 ORDER BY comments."createAt";`,[postId])).rows;
}

const postComment = async (userId, postId, comment) => {
    return await connection.query(`INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3);`,[userId, postId, comment]);
}

const getNumberOfComments = async(postId)=>{
    return (await connection.query(`SELECT COUNT(*) FROM comments WHERE "postId"=$1;`,[postId])).rows[0].count;
}

const getFollowStatus = async(followerId, followedId )=> {
    return (await connection.query(`SELECT * FROM follows WHERE "followerId"=$1 AND "followedId"= $2;`,[followerId, followedId])).rows;
}
export { getPost, getComments,postComment, getNumberOfComments, getFollowStatus}