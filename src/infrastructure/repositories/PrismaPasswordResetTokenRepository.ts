import { prisma } from "../database/prisma";
import { PasswordResetTokenRepository } from "../../domain/repositories/PasswordResetTokenRepository";
import { PasswordResetToken } from "../../domain/entities/PasswordResetToken";

export class PrismaPasswordResetTokenRepository
  implements PasswordResetTokenRepository
{
  async save(
    token: PasswordResetToken
  ): Promise<PasswordResetToken> {
    const createdToken = await prisma.password_reset_token.create({
      data: {
        user_id: token.userId,
        token_hash: token.tokenHash,
        expires_at: token.expiresAt,
        used_at: token.usedAt,
      },
    });

    return new PasswordResetToken(
      createdToken.id,
      createdToken.user_id,
      createdToken.token_hash,
      createdToken.expires_at,
      createdToken.used_at
    );
  }

  async findByTokenHash(
    tokenHash: string
  ): Promise<PasswordResetToken | null> {
    const token =
      await prisma.password_reset_token.findFirst({
        where: {
          token_hash: tokenHash,
        },
      });

    if (!token) {
      return null;
    }

    return new PasswordResetToken(
      token.id,
      token.user_id,
      token.token_hash,
      token.expires_at,
      token.used_at
    );
  }

  async markAsUsed(tokenId: number): Promise<void> {
    await prisma.password_reset_token.update({
      where: {
        id: tokenId,
      },
      data: {
        used_at: new Date(),
      },
    });
  }
}