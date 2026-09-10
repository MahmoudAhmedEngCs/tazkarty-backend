import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 ERROR:", err);
  console.error("🔥 MESSAGE:", err.message);
  console.error("🔥 STACK:", err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};