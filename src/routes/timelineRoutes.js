import express from "express";
import {
  postLink,
  getLinks,
  erasePost,
} from "../controllers/timelineControllers.js";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();
router.post("/timeline", postLink);
router.get("/timeline", getLinks);
router.delete("/timeline/:postId", validateLoggedUser, erasePost);
export default router;
