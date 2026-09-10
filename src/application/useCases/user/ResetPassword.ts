import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordResetTokenRepository } from "../../../domain/repositories/PasswordResetTokenRepository";
import { TokenHasher } from "../../../domain/services/TokenHasher";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";
import { AppError } from "../../../errors/AppError";

export class ResetPassword {
  constructor(
    private userRepository: UserRepository,
    private passwordResetTokenRepository: PasswordResetTokenRepository,
    private tokenHasher: TokenHasher,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(
    token: string,
    newPassword: string
  ): Promise<void> {

    const tokenHash = this.tokenHasher.hash(token);

    const resetToken =
      await this.passwordResetTokenRepository.findByTokenHash(
        tokenHash
      );

    if (!resetToken) {
      throw new AppError(
        "Invalid or expired reset token",
        400
      );
    }

    if (resetToken.usedAt) {
      throw new AppError(
        "Invalid or expired reset token",
        400
      );
    }

    if (resetToken.expiresAt <= new Date()) {
      throw new AppError(
        "Invalid or expired reset token",
        400
      );
    }

    const hashedPassword =
      await this.passwordHasher.hashPassword(newPassword);

    await this.userRepository.updatePassword(
      resetToken.userId,
      hashedPassword
    );

    await this.passwordResetTokenRepository.markAsUsed(
      resetToken.id
    );
  }
}