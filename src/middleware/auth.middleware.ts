import jwt from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"] as string | undefined;
  const token1 = req.cookies.token;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized! No token provided" });
  }

  const token2 = authHeader.split(" ")[1];

  try {
    const token = token1 === undefined ? token2 : token1;
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as {
      userId: number;
    };
    
    (req as any).userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
