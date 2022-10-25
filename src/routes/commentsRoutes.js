import express from "express";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";
import { listComments } from "../controllers/commentsControllers.js"; 

const router = express.Router();
router.get("/comments/:postId", listComments);//validateLoggedUser

export default router;