import urlMetadata from "url-metadata";
import * as timelineRepository from "../repositories/timelineRepository.js";
import * as postRepository from "../repositories/postRepository.js";
import * as likeRepository from "../repositories/likeRepository.js";
import * as hashtagRepository from "../repositories/hashtagRepository.js";
import * as repostRepository from "../repositories/repostRepository.js";

//função que procura por # no text
async function findHashtags(searchText) {
  let hashtag = [];
  let newHashtag;
  let regexp = /\B\#\w\w+\b/g;
  hashtag = searchText.text.match(regexp);
  if (hashtag) {
    hashtag.map(
      (hashtag) =>
        //hashtag sem #
        (newHashtag = hashtag.replace("#", ""))
    );
    let hashtagId = await searchAndInsertHashtags(newHashtag);
    return hashtagId;
  } else {
    return false;
  }
}

//função para procurar a hashtag na tabela de hashtags
async function searchAndInsertHashtags(hashtag) {
  const result = await hashtagRepository.getResult(hashtag);
  let hashtagId;
  if (result.length === 0) {
    const inserted = await hashtagRepository.insertHashtag(hashtag);
    if (inserted === 1) {
      hashtagId = await hashtagRepository.getHashtagId(hashtag);
    }
  } else {
    hashtagId = result[0].id;
  }

  return hashtagId;
}

async function insertIds(postId, hashtagId) {
  hashtagRepository.insertPostHashtagsId(postId, hashtagId);
}

const postLink = async (req, res) => {
  const { url, id } = req.body;
  const urlMetadatas = urlMetadata;
  let metadatas;
  let description, image, title;
  let { text } = req.body;
  let postId;
  let hashtagId;

  if (!text) {
    text = null;
  }
  //insersão Kássia funcão para procurar as # dentro do text do post
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
    const insertedPost = await timelineRepository.insertPost(
      id,
      text,
      url,
      description,
      image,
      title
    );

    //insersão Kássia query para pegar o id do post
    if (insertedPost.rowCount === 1) {
      let result = await hashtagRepository.getPostId();
      postId = result[0].max;
      console.log("entrou");
    }

    //insere na tabela postHashtags
    insertIds(postId, hashtagId);

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
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (existingPost.rows[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await likeRepository.deleteLike(postId);
    await repostRepository.deleteRepost(postId);
    await postRepository.deletePost(postId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  const { newText } = req.body;
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (existingPost.rows[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await postRepository.updatePost(newText, postId);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { postLink, getLinks, erasePost, editPost };
