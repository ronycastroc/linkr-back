import urlMetadata from "url-metadata";
import * as timelineRepository from "../repositories/timelineRepository.js";
import * as postRepository from "../repositories/postRepository.js";
import * as likeRepository from "../repositories/likeRepository.js";
import { connection } from "../database/db.js";


//função que procura por # no text
async function findHashtags(searchText) {
  let hashtag = [];
  let newHashtag;
  let regexp = /\B\#\w\w+\b/g;
  hashtag = searchText.text.match(regexp);
  if (hashtag) {
     hashtag.map((hashtag) => 
    //hashtag sem #
    newHashtag = hashtag.replace("#",""));
    let hashtagId = await searchAndInsertHashtags(newHashtag)
    return hashtagId;
  } else {
    return false;
  }
}

//função para procurar a hashtag na tabele de hashtags
async function searchAndInsertHashtags(hashtag){
  
  const result = (await connection.query(`SELECT id FROM hashtags WHERE text = $1;`,[hashtag])).rows
  let hashtagId;
  if( result.length === 0 ){
    const inserted = (await connection.query(`INSERT INTO hashtags (text) VALUES ($1);`,[hashtag])).rowCount
    if(inserted === 1){
      hashtagId = (await connection.query(`SELECT id FROM hashtags WHERE text = $1;`,[hashtag])).rows[0].id;
   }
  }else{
    hashtagId = result[0].id    
  }
  return hashtagId;
}

async function insertIds(postId, hashtagId){
  await connection.query(`INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2);`,[postId, hashtagId])
}

const postLink = async (req, res) => {
  const { url, id  } = req.body;
  const urlMetadatas = urlMetadata;
  let metadatas;
  let description, image, title;
  let { text } = req.body;
  let postId;
  let hashtagId;
  if (!text) {
    text = null;
  }
  //insersão Kássia funcão para procuras as # dentro do text do post
  hashtagId = await findHashtags(req.body);

  try {
    metadatas = await urlMetadatas(url);
  } catch (error) {
    console.log(error);
  }
  description = metadatas.description;
  image = metadatas.image;
  title = metadatas.title;
  try {
    const instetPost = await timelineRepository.insertPost(
      id,
      text,
      url,
      description,
      image,
      title
    );
    //insersão Kássia query para pegar o id do post
    if(instetPost.rowCount === 1 ){
      let result = (await connection.query(`SELECT MAX(id) FROM posts;`)).rows;
      postId = result[0].max;
    }
    
    //insere na tabela postHashtags
    insertIds(postId, hashtagId)
      
    res.sendStatus(201);
    
  } catch (error) {
    res.status(500).send(error.message);
  }

};

const getLinks = async (req, res) => {
  try {
    const urls = await timelineRepository.listPosts();
    res.send(urls);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const erasePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await likeRepository.deleteLike(postId);
    await postRepository.deletePost(postId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await postRepository.updatePost(postId);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { postLink, getLinks, erasePost, editPost };
