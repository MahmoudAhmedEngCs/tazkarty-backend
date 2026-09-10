import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../errors/AppError";

type ValidationTarget = "body" | "params" | "query";

export function validate(
  schema: ZodType,
  target: ValidationTarget = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => {
          const path = issue.path.join(".");
          return `${path}: ${issue.message}`;
        })
        .join(", ");

      throw new AppError(message, 400);
    }

req.validated = {
  ...(req.validated as object || {}),
  ...(result.data as object),
};

    next();
  };
}