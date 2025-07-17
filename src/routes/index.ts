import { Router } from "express";
import homeRoutes from "./home.routes";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import { loginRateLimiterMiddleware } from "../middleware";
import tasksRoutes from "./tasks.routes";
const router = Router();

router.use("/", homeRoutes);
router.use("/health", healthRoutes);
router.use("/auth", loginRateLimiterMiddleware, authRoutes);
router.use("/tasks", tasksRoutes);

export default router;
