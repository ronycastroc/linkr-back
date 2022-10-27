import express from "express";
import {
  repostPost,
  countReposts,
  listReposts,
  getReposts,
} from "../controllers/repostController.js";
import {
  validateLoggedUser,
  fetchReposterName,
} from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post(
  "/repost/:postId",
  validateLoggedUser,
  fetchReposterName,
  repostPost
);
router.get("/repost/:postId", countReposts);
router.get("/reposts/:postId", listReposts);
router.get("/reposts", getReposts);

export default router;
