import { NextFunction, Request, Response } from "express";

interface RateLimit {
  attempts: number;
  time: number;
}
const rateLimitMap = new Map<string, RateLimit>();
const WINDOW_IN_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export const loginRateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIp = req.ip!;
  const time = Date.now();

  const userEntry = rateLimitMap.get(userIp);

  if (!userEntry) {
    rateLimitMap.set(userIp, { attempts: 1, time });
    return next();
  }

  const timePassed = time - userEntry?.time!;
  if (timePassed > WINDOW_IN_MS) {
    rateLimitMap.set(userIp, { attempts: 1, time });
    next();
  }

  const userAttempts = userEntry?.attempts!;

  if (userAttempts >= MAX_ATTEMPTS) {
    return res.status(429).json({
      message: "Too many attempts. You are blocked for 1 hour.",
    });
  }

  rateLimitMap.set(userIp, {
    attempts: userAttempts + 1,
    time,
  });

  next();
};
