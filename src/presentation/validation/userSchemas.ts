import { z } from "zod";

const egyptianPhoneSchema = z
  .string()
  .regex(
    /^(010|011|012|015)\d{8}$/,
    "Phone number must be a valid Egyptian mobile number"
  );

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  phoneNumber: egyptianPhoneSchema,

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

export const loginSchema = z.object({
  phoneNumber: egyptianPhoneSchema,

  password: z
    .string()
    .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  phoneNumber: egyptianPhoneSchema,
});

export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, "Reset token is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});