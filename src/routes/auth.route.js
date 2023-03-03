import { Router } from "express";
import { checkUserExists } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/global.middleware.js";
import signInSchema from "../schemas/auth.schemas/signIn.js";
import authController from "../controllers/auth.controller.js";

const router = Router("/");

router.post("/signin", validateSchema(signInSchema), checkUserExists, authController.create);

export { router as authRouter };
