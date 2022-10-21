import express from "express";
import {postLink,getLinks} from "../controllers/timelineControllers.js"

const router = express.Router();
router.post("/timeline", postLink);
router.get("/timeline", getLinks)
export default router;