import * as repostRepository from "../repositories/repostRepository.js";
import * as postRepository from "../repositories/postRepository.js";

const repostPost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    /* const existingUserLike = await likeRepository.getUserLikes(postId, userId);
      if (existingUserLike.rowCount !== 0) {
        await likeRepository.deleteUserLike(postId, userId);
        console.log(existingUserLike);
        return res.sendStatus(200);
      } */
    await repostRepository.insertRepost(userId, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const countReposts = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    const reposts = (await repostRepository.countReposts(postId)).rows[0].count;
    res.status(200).send(reposts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const listReposts = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    const reposts = (await repostRepository.listReposts(postId)).rows;
    res.status(200).send(reposts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { repostPost, countReposts, listReposts };
