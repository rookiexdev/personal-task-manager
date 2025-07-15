export interface AuthRequest extends Request {
  query: { [key: string]: string };
  cookies: { token: string };
  userId: number;
}
