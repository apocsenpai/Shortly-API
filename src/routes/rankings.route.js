import { Router } from "express";
import rankingController from "../controllers/ranking.controller.js";

const router = Router("/ranking");

router.get("/", rankingController.getAll);

export { router as rankingsRouter };
