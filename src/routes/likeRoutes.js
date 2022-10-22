import express from "express";
import {
  likePost,
  unlikePost,
  countLikes,
  listLikes,
} from "../controllers/likeController.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post("/like/:postId", validateLoggedUser, likePost);
router.get("/like/:postId", countLikes);
router.get("/like/list/:postId", listLikes);
router.delete("/like/:postId", validateLoggedUser, unlikePost);

export default router;
