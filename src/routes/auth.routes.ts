import { Router } from "express";
import { loginController, registerController } from "../controllers";
import { loginRateLimiter } from "../middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginRateLimiter, loginController);

export default router;
