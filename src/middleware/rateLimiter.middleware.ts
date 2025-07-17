import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (_req: Request, res: Response, _next: NextFunction) => {
    return res.status(429).json({
      message: "Too many attempts. You are blocked for 1 hour.",
    });
  },

  skipSuccessfulRequests: false,
});

export const loginRateLimiterMiddleware = () => {
  
}