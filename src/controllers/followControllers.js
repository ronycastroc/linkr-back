import * as followRepository from "../repositories/followRepository.js";

const listFollowers = async (req, res) => {
   const userId = res.locals.userId;

   try {
      const followers = await followRepository.getFollowers(userId);

      res.status(200).send(followers.rows);

   } catch (error) {
      res.status(500).send(error.message);
   }
};

const listFollower = async (req, res) => {
   const { followedId } = req.params;
   const userId = res.locals.userId;

   try {
      const follower = await followRepository.getFollower({ followedId, userId });

      res.status(200).send(follower.rows);

   } catch (error) {
      res.status(500).send(error.message);
   }
};

const followUser = async (req, res) => {
   const { followedId } = req.params;
   const userId = res.locals.userId;

   if (Number(followedId) === userId) {
      return res.sendStatus(400);
   }

   try {
      const isUserToFollow = await followRepository.getUserFollow(followedId);

      if (isUserToFollow.rowCount === 0) {
         return res.sendStatus(404);
      }

      const isFollow = await followRepository.getFollower({ followedId, userId });

      if (isFollow.rowCount !== 0) {
         return res.sendStatus(400);
      }

      await followRepository.insertFollow({ userId, followedId });

      res.sendStatus(200);

   } catch (error) {
      res.status(500).send(error.message);
   }
};

const unfollowUser = async (req, res) => {
   const { followedId } = req.params;
   const userId = res.locals.userId;

   if (Number(followedId) === userId) {
      return res.sendStatus(400);
   }

   try {
      const isUserToUnfollow = await followRepository.getUserFollow(followedId);

      if (isUserToUnfollow.rowCount === 0) {
         return res.sendStatus(404);
      }

      const isUnfollow = await followRepository.getFollower({ userId, followedId });

      if (isUnfollow.rowCount === 0) {
         return res.sendStatus(400);
      }

      await followRepository.deleteFollow({ userId, followedId });

      res.sendStatus(200);

   } catch (error) {
      res.status(500).send(error.message);
   }
};

export { listFollowers, listFollower, followUser, unfollowUser };