import express from "express";
import { getHashtagPosts, getHashtagTrending} from "../controllers/hashtagsControllers.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();
router.get("/trending", validateLoggedUser, getHashtagTrending); 
router.get("/hashtag/:hashtag", validateLoggedUser, getHashtagPosts);

export default router;