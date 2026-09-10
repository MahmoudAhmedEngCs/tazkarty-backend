import { PasswordResetToken } from "../entities/PasswordResetToken";

export interface PasswordResetTokenRepository {
  save(token: PasswordResetToken): Promise<PasswordResetToken>;

  findByTokenHash(
    tokenHash: string
  ): Promise<PasswordResetToken | null>;

  markAsUsed(tokenId: number): Promise<void>;
}