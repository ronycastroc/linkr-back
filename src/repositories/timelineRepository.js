import { connection } from "../database/db.js";

const insertPost = async (id,text,url,description,image,title)=>{
    return await connection.query(`
    INSERT INTO "posts"
        ("userId",text,url,description,image,title)
        VALUES
        ($1,$2,$3,$4,$5,$6);

`,[id,text,url,description,image,title]);
};

const listPosts = async (id)=>{
    return (await connection.query(`
    SELECT users.name, users."urlImage", posts.*, follows.id, follows."followerId" FROM posts
    JOIN follows
    ON posts."userId" = follows."followedId"
    JOIN users
    ON users.id = posts."userId"
    WHERE follows."followerId" = $1
    ;`, [id])).rows 
}
const getLength = async ()=>{
    return (await connection.query(`
    SELECT COUNT(posts.id) FROM posts;
    `)).rows
}

export {insertPost,listPosts,getLength}