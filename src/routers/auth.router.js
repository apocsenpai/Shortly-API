import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware";
import signInSchema from "../schemas/auth.schemas/signIn";

const router = Router("/");

router.post("/signin", validateSchema(signInSchema));

export { router as authRouter };
