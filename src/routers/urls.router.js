import { Router } from "express";
import { validateSchema } from "../middlewares/global.middleware";
import idSchema from "../schemas/id.schema";
import createUrlSchema from "../schemas/urls.schemas/create";

const router = Router("/urls");

router.post("/shorten", validateSchema(createUrlSchema));

router.get("/:id", validateSchema(idSchema));
router.get("/open/:shortUrl");

router.delete("/:id", validateSchema(idSchema));

export { router as urlsRouter };
