import { connection } from "../database/db.js";

const insertPost = async (id,text,url,description,image,title)=>{
    return await connection.query(`
    INSERT INTO "posts"
        ("userId",text,url,description,image,title)
        VALUES
        ($1,$2,$3,$4,$5,$6);

`,[id,text,url,description,image,title]);
};

const listPosts = async ()=>{
    return (await connection.query(`
    SELECT posts.*,users."urlImage",users.name
    FROM posts
    JOIN users ON users.id=posts."userId"
    ORDER BY "createAt" DESC LIMIT 20;
    `)).rows 
}

export {insertPost,listPosts}