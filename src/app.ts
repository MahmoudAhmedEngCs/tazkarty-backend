
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./infrastructure/swagger";
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  forgotPasswordController,
  jwtService,
  userRepository,
  resetPasswordController,
  changePasswordController,
} from "./infrastructure/container/userContainer";

import { createUserRoutes } from "./presentation/routes/user.routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import { bookTicketController, getAllMatchesController, getAvailableSeatsForMatchSectionController, getMatchByIdController, getSectionsForMatchController } from "./infrastructure/container/matchContainer";
import { createMatchRoutes } from "./presentation/routes/match.routes";
import type { User } from "./domain/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      validated?: unknown;
    }
  }
}
const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(limiter);

app.use(express.json({ limit: "10kb" }));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  "/users",
  createUserRoutes(
    registerUserController,
    loginUserController,
    getCurrentUserController,
    forgotPasswordController,
    resetPasswordController,
    jwtService,
    userRepository,
    changePasswordController
  )
);
app.use("/matches", createMatchRoutes(getAllMatchesController, getMatchByIdController, getSectionsForMatchController, getAvailableSeatsForMatchSectionController,bookTicketController));
app.use(errorHandler);

export default app;