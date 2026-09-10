import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { JwtService } from "../../domain/services/JwtService";
import { AppError } from "../../errors/AppError";


export function authMiddleware(
  jwtService: JwtService,
  userRepository: UserRepository
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError("Authentication required", 401);
      }

      const [scheme, token] = authHeader.split(" ");

      if (scheme !== "Bearer" || !token) {
        throw new AppError("Invalid authorization header", 401);
      }

      const decoded = jwtService.verifyToken(token);

      if (!decoded) {
        throw new AppError("Invalid or expired token", 401);
      }

      const user = await userRepository.findById(decoded.userId);

      if (!user) {
        throw new AppError("User not found", 401);
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}