import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware.js";
import { checkUserEmail } from "../middlewares/user.middleware.js";
import createUserSchema from "../schemas/users.schemas/create.js";
import userController from "../controllers/user.controller.js";

const router = Router("/");

router.post("/signup", validateSchema(createUserSchema), checkUserEmail, userController.create);

router.get("/users/me");

export { router as usersRouter };
