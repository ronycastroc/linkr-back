import express from "express";
import { likePost, unlikePost } from "../controllers/likeController.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post("/like/:postId", validateLoggedUser, likePost);
router.delete("/like/:postId", validateLoggedUser, unlikePost);

export default router;
