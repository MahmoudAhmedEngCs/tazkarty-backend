import crypto from "crypto";
import { PasswordResetTokenGenerator } from "../../domain/services/PasswordResetTokenGenerator";

export class PasswordResetTokenGeneratorService
  implements PasswordResetTokenGenerator
{
  async generateToken(): Promise<string> {
    return crypto.randomBytes(32).toString("hex");
  }
}