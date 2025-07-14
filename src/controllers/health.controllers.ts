import { Request, Response } from "express";

export const healthController = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Healthy 👍 and ready to serve 🚀", success: true });
};
