import express from "express";
import { listFollowers, listFollower, followUser, unfollowUser } from "../controllers/followControllers.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.get("/followers", validateLoggedUser, listFollowers);
router.get("/follower/:followedId", validateLoggedUser, listFollower);
router.post("/follow/:followedId", validateLoggedUser, followUser);
router.delete("/unfollow/:followedId", validateLoggedUser, unfollowUser);

export default router;