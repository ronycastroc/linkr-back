import express from "express";
import { signUp } from "../controllers/authControllers.js";
import {postLink,getLinks} from "../controllers/timelineControllers.js"
const router = express.Router();

router.post("/auth/signup", signUp);
router.post("/timeline", postLink);
router.get("/timeline", getLinks)

export default router;