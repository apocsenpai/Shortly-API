import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware.js";
import { checkUserEmailAlreadyExists } from "../middlewares/user.middleware.js";
import createUserSchema from "../schemas/users.schemas/create.js";
import userController from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router("/");

router.post("/signup", validateSchema(createUserSchema), checkUserEmailAlreadyExists, userController.create);

router.get("/users/me", authenticateUser, userController.getById);

export { router as usersRouter };
