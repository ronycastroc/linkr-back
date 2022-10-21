import { connection } from "../database/db.js";
import joi from "joi";
import urlMetadata from "url-metadata";
import * as postRepository from "../repositories/postRepository.js";
import * as likeRepository from "../repositories/likeRepository.js";

const timelineSchema = joi.object({
  url: joi.string().required(),
  id: joi.number().required(),
  text: joi.string().allow(""),
});

const postLink = async (req, res) => {
  //midleware
  const { url, id } = req.body;
  const urlMetadatas = urlMetadata;
  let metadatas;
  let description, image, title;
  let { text } = req.body;
  if (!text) {
    text = null;
  }
  const validation = timelineSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }
  try {
    const userIdValidation = (
      await connection.query(
        `
        SELECT * 
        FROM users 
        WHERE id = $1;`,
        [id]
      )
    ).rows[0];
    if (!userIdValidation) {
      res.sendStatus(409);
    }
    metadatas = await urlMetadatas(url);
  } catch (error) {
    console.log(error);
  }

  //midleware
  description = metadatas.description;
  image = metadatas.image;
  title = metadatas.title;
  try {
    await connection.query(
      `
            INSERT INTO "posts"
                ("userId",text,url,description,image,title)
                VALUES
                ($1,$2,$3,$4,$5,$6);
    
    `,
      [id, text, url, description, image, title]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

const getLinks = async (req, res) => {
  let urls;
  try {
    urls = (
      await connection.query(`
        SELECT posts.*,users."urlImage",users.name
        FROM posts
        JOIN users ON users.id=posts."userId"
        ORDER BY "createAt" DESC LIMIT 20;
        `)
    ).rows;
  } catch (error) {
    console.log(error);
  }
  res.send(urls);
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
