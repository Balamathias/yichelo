import { Router } from "express";

import { getRecommendedProducts } from "../controllers/recommendation.controller";

const router = Router();

router.get("/", getRecommendedProducts as any);

export default router;