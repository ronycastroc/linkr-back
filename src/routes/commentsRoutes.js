import express from "express";
import { validateLoggedUser } from "../middlewares/userAuthMiddleware.js";
import { listComments, insertComment, countingComments} from "../controllers/commentsControllers.js"; 

const router = express.Router();
router.get("/comments/:postId",validateLoggedUser, listComments);
router.get("/comments/count/:postId", validateLoggedUser, countingComments);
router.post("/comments/:postId", validateLoggedUser, insertComment);

export default router;