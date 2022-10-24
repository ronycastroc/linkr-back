import express from "express";
import {
  postLink,
  getLinks,
  erasePost,
} from "../controllers/timelineControllers.js";
import {validateLoggedUser} from "../middlewares/userAuthMiddleware.js"
import {postLinkMiddleware} from "../middlewares/timelineMiddleware.js"
import { getHashtagTrending } from "../controllers/hashtagsControllers.js" 
const router = express.Router();

router.post("/timeline",validateLoggedUser, postLinkMiddleware,postLink, getHashtagTrending);
router.get("/timeline",validateLoggedUser, getLinks);
router.delete("/timeline/:postId", validateLoggedUser, erasePost);

export default router;
