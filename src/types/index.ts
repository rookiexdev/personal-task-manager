export interface AuthRequest extends Request {
  cookies: { token: string };
  userId: number;
}
