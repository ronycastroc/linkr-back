import express from "express";
import { getHashtagTrending } from "../controllers/hashtagsControllers.js";

const router = express.Router();
router.get("/trending", getHashtagTrending);


export default router;