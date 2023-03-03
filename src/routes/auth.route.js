import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware.js";
import signInSchema from "../schemas/auth.schemas/signIn.js";

const router = Router("/");

router.post("/signin", validateSchema(signInSchema));

export { router as authRouter };
