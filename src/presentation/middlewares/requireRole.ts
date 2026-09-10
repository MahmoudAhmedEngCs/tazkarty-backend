import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { UserRole } from "../../domain/entities/User";

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        "You are not authorized to perform this action",
        403
      );
    }

    next();
  };
}