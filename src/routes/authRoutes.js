import express from "express";
import { signUp } from "../controllers/authControllers.js";
import {postLink} from "../controllers/timelineControllers.js"
const router = express.Router();

router.post("/auth/signup", signUp);
router.post("/timeline", postLink);

export default router;