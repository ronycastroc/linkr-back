import * as likeRepository from "../repositories/likeRepository.js";

const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const existingPost = await likeRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await likeRepository.insertLike(userId, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await likeRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await likeRepository.deleteLike(userId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { likePost, unlikePost };
