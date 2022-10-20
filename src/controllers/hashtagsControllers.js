import { connection } from "../database/db.js";

async function getHashtagTrending(req, res) {
    //falta autenticação da rota de posts
    
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

export { getHashtagTrending };
