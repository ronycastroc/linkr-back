import { connection } from "../database/db.js";

async function getHashtagTranding(req, res) {
    //falta autenticação
    
  try {
    const tranding = (
      await connection.query(
        `SELECT text, COUNT(text) FROM "postHashtags" JOIN hashtags ON "postHashtags"."hashtagId" = hashtags.id GROUP BY text ORDER BY COUNT desc;`
      )
    ).rows;
  
    return res.status(200).send(tranding);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { getHashtagTranding };
