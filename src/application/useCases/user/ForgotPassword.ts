import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordResetTokenRepository } from "../../../domain/repositories/PasswordResetTokenRepository";
import { PasswordResetTokenGenerator } from "../../../domain/services/PasswordResetTokenGenerator";
import { TokenHasher } from "../../../domain/services/TokenHasher";
import { PasswordResetToken } from "../../../domain/entities/PasswordResetToken";
import { PasswordResetNotifier } from "../../../domain/services/PasswordResetNotifier";

export class ForgotPassword {
constructor(
  private userRepository: UserRepository,
  private passwordResetTokenRepository: PasswordResetTokenRepository,
  private tokenGenerator: PasswordResetTokenGenerator,
  private tokenHasher: TokenHasher,
  private passwordResetNotifier: PasswordResetNotifier
) {}

  async execute(phoneNumber: string): Promise<string> {
    const user =
      await this.userRepository.findByPhoneNumber(phoneNumber);

    // نفس الرسالة سواء المستخدم موجود أو لا
    if (!user) {
      return "If the account exists, reset instructions have been sent.";
    }

    // 1. Generate raw token
    const rawToken =await this.tokenGenerator.generateToken();

    // 2. Hash token before storing it
    const tokenHash = this.tokenHasher.hash(rawToken);

    // 3. Token expires after 15 minutes
    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // 4. Create domain entity
    const resetToken = new PasswordResetToken(
      0,
      user.id,
      tokenHash,
      expiresAt,
      null
    );

    // 5. Save token hash in database
    await this.passwordResetTokenRepository.save(resetToken);
    
    // 6. Notify user
  await this.passwordResetNotifier.sendResetCode(
  user.phoneNumber,
  rawToken
);

    // مؤقتًا للـdevelopment فقط
    return "If the account exists, reset instructions have been sent.";
  }
}