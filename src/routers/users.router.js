import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware";
import createUserSchema from "../schemas/users.schemas/create";

const router = Router("/");

router.post("/signup", validateSchema(createUserSchema));

router.get("/users/me");

export { router as usersRouter };
