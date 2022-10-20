import express from "express";
import { getHashtagTranding } from "../controllers/hashtagsControllers.js";

const router = express.Router();
router.get("/teste", getHashtagTranding);


export default router;