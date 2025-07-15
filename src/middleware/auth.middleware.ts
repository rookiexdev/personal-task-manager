import jwt from "jsonwebtoken";
import config from "../config";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";

export function isAuthenticated(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user", success: false });
  }
  const decoded = jwt.verify(token, config.JWT_SECRET!) as { userId: number };

  req.userId = decoded.userId;
  next();
}
