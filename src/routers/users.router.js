import { Router } from "express";

const router = Router("/users");

router.get("/me");

export { router as usersRouter };
