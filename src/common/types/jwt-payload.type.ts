export interface JwtPayload {
  sub: string;
  role: string;
  condominiumId: string;
  iat?: number;
  exp?: number;
}
