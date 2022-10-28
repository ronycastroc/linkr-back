import { connection } from "../database/db.js";


const getHashtagId = async (hashtag) => {
  return (await connection.query(`SELECT id FROM hashtags WHERE text = $1;`,[hashtag])).rows[0].id;
};

const insertHashtag = async (hashtag) => {
  return (await connection.query(`INSERT INTO hashtags (text) VALUES ($1);`,[hashtag])).rowCount ;
};

const getResult = async (hashtag) => {
  return (await connection.query(`SELECT id FROM hashtags WHERE text = $1;`,[hashtag])).rows;
};

const insertPostHashtagsId = async (postId, hashtagId) => { 
  return await connection.query(`INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2);`,[postId, hashtagId]);
};

let getPostId = async () => {
  return (await connection.query(`SELECT MAX(id) FROM posts;`)).rows;
};

const getTrending = async () => {
  return (await connection.query(`SELECT text, COUNT(text) FROM "postHashtags" JOIN hashtags ON "postHashtags"."hashtagId" = hashtags.id GROUP BY text ORDER BY COUNT desc;`)).rows;
};

const findHashtagInText = async (hashtag) => {
  return (await connection.query(`SELECT text FROM hashtags WHERE text= $1;`,[hashtag])).rowCount;
};

const getHashtagPosts = async (hashtag,offset) => {
  return (await connection.query(`
  SELECT 
  users.name, users."urlImage", 
  posts.*, hashtags.text AS hashtag 
  FROM posts 
  JOIN "postHashtags" ON posts."id"="postHashtags"."postId" 
  JOIN users ON posts."userId" =users.id JOIN hashtags 
  ON "postHashtags"."hashtagId" = hashtags.id 
  WHERE hashtags.text =$1
  ORDER BY "createAt" 
  DESC LIMIT 10 
  OFFSET $2;
  ;`,[hashtag,offset])).rows;
}; 
const getHashtagPostsLength =async (hashtag)=>{
  return (await connection.query(`
  SELECT COUNT("postHashtags".id) 
	FROM "postHashtags"
 	JOIN hashtags ON "postHashtags"."hashtagId" = hashtags.id  
  WHERE hashtags.text=$1
    `,[hashtag])).rows

}
  export { getHashtagPostsLength,getHashtagId, insertHashtag, getResult, insertPostHashtagsId, getPostId, getTrending, findHashtagInText, getHashtagPosts }