import { connection } from "../database/db.js";

async function getHashtagTrending(req, res) {
     
  try {
    const trending = (
      await connection.query(
        `SELECT text, COUNT(text) FROM "postHashtags" JOIN hashtags ON "postHashtags"."hashtagId" = hashtags.id GROUP BY text ORDER BY COUNT desc;`
      )
    ).rows;
  
    return res.status(200).send(trending);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getHashtagPosts(req, res){
  const { hashtag } = req.params;
  console.log(hashtag)
 
  try {
    const findHashtag =  (await connection.query(`SELECT text FROM hashtags WHERE text= $1;`,[hashtag])).rowCount;
    
    if( findHashtag < 1){
      return res.sendStatus(404); 
    }

    const listPosts = (await connection.query(`SELECT users.name, users."urlImage", posts.text, posts.url, hashtags.text AS hashtag FROM posts JOIN "postHashtags" ON posts."id"="postHashtags"."postId" JOIN users ON posts."userId" =users.id JOIN hashtags ON "postHashtags"."hashtagId" = hashtags.id WHERE hashtags.text = $1;`,[hashtag])).rows;
   
    return res.status(200).send(listPosts);
  
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}

export { getHashtagTrending, getHashtagPosts };
