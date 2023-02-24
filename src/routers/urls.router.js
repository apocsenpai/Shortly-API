import { Router } from "express";

const router = Router("/urls");

router.post("/shorten");

router.get("/:id");
router.get("/open/:shortUrl");

router.delete("/:id");

export { router as urlsRouter };
