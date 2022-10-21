import express from "express";
import { getHashtagTrending, getHashtagPosts } from "../controllers/hashtagsControllers.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();
router.get("/trending", getHashtagTrending); 
router.get("/hashtag/:hashtag", validateLoggedUser, getHashtagPosts);//validateLoggedUser

export default router;