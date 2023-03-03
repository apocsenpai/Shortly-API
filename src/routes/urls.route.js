import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/global.middleware.js";
import idSchema from "../schemas/id.schema.js";
import createUrlSchema from "../schemas/urls.schemas/create.js";
import urlController from "../controllers/url.controller.js";

const router = Router("/urls");

router.post(
  "/shorten",
  authenticateUser,
  validateSchema(createUrlSchema),
  urlController.create
);

router.get("/:id", validateSchema(idSchema), urlController.getById);
router.get("/open/:shortUrl");

router.delete("/:id", validateSchema(idSchema));

export { router as urlsRouter };
