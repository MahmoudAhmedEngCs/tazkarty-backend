import { Router } from "express";

import { RegisterUserController } from "../controllers/user/RegisterUserController";
import { LoginUserController } from "../controllers/user/LoginUserController";
import  {ForgotPasswordController}  from "../controllers/user/ForgotPasswordController";
import { GetCurrentUserController } from "../controllers/user/GetCurrentUserController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";

import { JwtService } from "../../domain/services/JwtService";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ResetPasswordController } from "../controllers/user/ResetPasswordController";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/userSchemas";
import { ChangePasswordController } from "../controllers/user/ChangePasswordController";

const router = Router();

export function createUserRoutes(
 registerUserController: RegisterUserController,
  loginUserController: LoginUserController,
  getCurrentUserController: GetCurrentUserController,
  forgotPasswordController: ForgotPasswordController,
  resetPasswordController: ResetPasswordController,
  jwtService: JwtService,
  userRepository: UserRepository,
  changePasswordController: ChangePasswordController
) {
  /**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmed Mohamed"
 *               phoneNumber:
 *                 type: string
 *                 example: "01012345678"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Phone number already registered
 */
 router.post(
  "/register",
  validate(registerSchema),
  registerUserController.execute.bind(registerUserController)
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "01012345678"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid phone number or password
 */
router.post(
  "/login",
  validate(loginSchema),
  loginUserController.execute.bind(loginUserController)
);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "01012345678"
 *     responses:
 *       200:
 *         description: Reset instructions request processed
 *       400:
 *         description: Invalid request data
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordController.execute.bind(forgotPasswordController)
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user returned successfully
 *       401:
 *         description: Authentication required or token invalid
 */
router.get(
  "/me",
  authMiddleware(jwtService, userRepository),
  getCurrentUserController.execute.bind(getCurrentUserController)
);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password using reset token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "a1b2c3d4e5f6..."
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset token
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController.execute.bind(resetPasswordController)
);

/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     summary: Change current user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "password123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request data or current password
 *       401:
 *         description: Authentication required
 */
router.patch(
  "/change-password",
  authMiddleware(jwtService, userRepository),
  validate(changePasswordSchema),
  changePasswordController.execute.bind(changePasswordController)
);
  return router;
}