import { User } from "../../domain/entities/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    validated?: unknown;
  }
}