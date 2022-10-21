import express from "express";
import { getHashtagTrending, getHashtagPosts } from "../controllers/hashtagsControllers.js";

const router = express.Router();
router.get("/trending", getHashtagTrending); 
router.get("/hashtag/:hashtag", getHashtagPosts);//validateLoggedUser

export default router;