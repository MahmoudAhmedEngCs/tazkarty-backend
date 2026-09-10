export class PasswordResetToken {
  constructor(
    public id: number,
    public userId: number,
    public tokenHash: string,
    public expiresAt: Date,
    public usedAt: Date | null
  ) {}
}