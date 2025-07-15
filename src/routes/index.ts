import { Router } from "express";
import homeRoutes from "./home.routes";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import { loginRateLimiter } from "../middleware";
const router = Router();

router.use("/", loginRateLimiter, homeRoutes);
router.use("/health", loginRateLimiter, healthRoutes);
router.use("/auth", loginRateLimiter, authRoutes);

export default router;
