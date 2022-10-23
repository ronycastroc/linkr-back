import * as likeRepository from "../repositories/likeRepository.js";
import * as postRepository from "../repositories/postRepository.js";

const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    const existingUserLike = await likeRepository.getUserLikes(postId, userId);
    if (existingUserLike.rowCount !== 0) {
      await likeRepository.deleteUserLike(postId, userId);
      console.log(existingUserLike);
      return res.sendStatus(200);
    }
    await likeRepository.insertLike(userId, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await likeRepository.deleteLike(postId, userId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const countLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    const likes = (await likeRepository.countLikes(postId)).rows[0].count;
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const listLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    const likes = (await likeRepository.listLikes(postId)).rows;
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const listLikesByUser = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }

    const userLikes = (await likeRepository.getUserLikes(userId, postId))
      .rows[0];
    res.status(200).send(userLikes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { likePost, unlikePost, countLikes, listLikes, listLikesByUser };
