import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the API" });
});

export default router;
