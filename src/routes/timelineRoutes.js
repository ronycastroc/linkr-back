import express from "express";
import {
  postLink,
  getLinks,
  erasePost,
  editPost,
  getUpdate,
  getIsFollowing
} from "../controllers/timelineControllers.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";
import { postLinkMiddleware } from "../middlewares/timelineMiddleware.js";
import { getHashtagTrending } from "../controllers/hashtagsControllers.js";
const router = express.Router();

router.post(
  "/timeline",
  validateLoggedUser,
  postLinkMiddleware,
  postLink,
  getHashtagTrending
);

router.get("/timeline/:userId", validateLoggedUser, getLinks);
router.delete("/timeline/:postId", validateLoggedUser, erasePost);
router.put("/timeline/:postId", validateLoggedUser, editPost);
router.get("/update/:userId",getUpdate)
router.get("/isfollowing/:id", getIsFollowing)

export default router;
