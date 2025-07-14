import { Router } from "express";
import homeRoutes from "./home.routes";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
const router = Router();

router.use("/", homeRoutes);
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

export default router;
