import { Router } from "express";
import homeRoutes from "./home.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/", homeRoutes);
router.use("/health", healthRoutes);

export default router;
