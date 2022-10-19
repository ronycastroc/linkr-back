import express from "express";
import { signUp, signIn } from "../controllers/authControllers.js";

import { validateSignUp, validateSignIn } from "../middlewares/joiAuthMiddlewares.js";

const router = express.Router();

router.post("/auth/signup", validateSignUp, signUp);
router.post("/auth/signin", validateSignIn, signIn);

export default router;