import { JwtPayload, SignOptions } from "jsonwebtoken";

export interface JwtService {
  generateToken(
    payload: object,
    expiresIn?: SignOptions["expiresIn"]
  ): string;

  verifyToken(token: string): JwtPayload | null;
}