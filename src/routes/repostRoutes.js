import express from "express";
import {
  repostPost,
  countReposts,
  listReposts,
} from "../controllers/repostController.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post("/repost/:postId", validateLoggedUser, repostPost);
router.get("/repost/:postId", countReposts);
router.get("/reposts/:postId", listReposts);

export default router;
