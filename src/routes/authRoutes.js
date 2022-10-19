import express from "express";
import { signUp, signIn } from "../controllers/authControllers.js";

import { validateSignUp, validateSignIn } from "../middlewares/joiAuthMiddlewares.js";

const router = express.Router();

router.post("/auth/sign-up", validateSignUp, signUp);
router.post("/auth/sign-in", validateSignIn, signIn);

export default router;