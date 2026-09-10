import { SignOptions } from "jsonwebtoken";

import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaPasswordResetTokenRepository } from "../repositories/PrismaPasswordResetTokenRepository";

import { BcryptPasswordHasher } from "../security/BcryptPasswordHasher";
import { JwtTokenService } from "../security/JwtTokenService";
import { PasswordResetTokenGeneratorService } from "../security/PasswordResetTokenGeneratorService";
import { Sha256TokenHasher } from "../security/Sha256TokenHasher";

import { ConsolePasswordResetNotifier } from "../notifications/ConsolePasswordResetNotifier";

import { RegisterUser } from "../../application/useCases/user/RegisterUser";
import { LoginUser } from "../../application/useCases/user/LoginUser";
import { ForgotPassword } from "../../application/useCases/user/ForgotPassword";

import { RegisterUserController } from "../../presentation/controllers/user/RegisterUserController";

import {ForgotPasswordController} from "../../presentation/controllers/user/ForgotPasswordController";
import { GetCurrentUserController } from "../../presentation/controllers/user/GetCurrentUserController";
import { LoginUserController } from "../../presentation/controllers/user/LoginUserController";

import { ResetPassword } from "../../application/useCases/user/ResetPassword";
import { ResetPasswordController } from "../../presentation/controllers/user/ResetPasswordController";
import { ChangePassword } from "../../application/useCases/user/ChangePassword";
import { ChangePasswordController } from "../../presentation/controllers/user/ChangePasswordController";
// ========================
// Shared Infrastructure
// ========================

export const userRepository = new PrismaUserRepository();

export const passwordHasher = new BcryptPasswordHasher();

export const jwtService = new JwtTokenService(
  process.env.JWT_SECRET!,
  process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
);

export const passwordResetTokenRepository =
  new PrismaPasswordResetTokenRepository();

export const passwordResetTokenGenerator =
  new PasswordResetTokenGeneratorService();

export const tokenHasher =
  new Sha256TokenHasher();

export const passwordResetNotifier =
  new ConsolePasswordResetNotifier();



// ========================
// Use Cases
// ========================

const registerUser = new RegisterUser(
  userRepository,
  passwordHasher,
  jwtService
);

const loginUser = new LoginUser(
  userRepository,
  passwordHasher,
  jwtService
);

const forgotPassword = new ForgotPassword(
  userRepository,
  passwordResetTokenRepository,
  passwordResetTokenGenerator,
  tokenHasher,
  passwordResetNotifier
);

const resetPassword = new ResetPassword(
  userRepository,
  passwordResetTokenRepository,
  tokenHasher,
  passwordHasher
);
const changePassword = new ChangePassword(
  userRepository,
  passwordHasher
);



// ========================
// Controllers
// ========================
export const resetPasswordController = new ResetPasswordController(resetPassword);
export const getCurrentUserController =
  new GetCurrentUserController();

export const registerUserController =
  new RegisterUserController(registerUser);

export const loginUserController =
  new LoginUserController(loginUser);

export const forgotPasswordController =
  new ForgotPasswordController(forgotPassword);


export const changePasswordController =
  new ChangePasswordController(changePassword);