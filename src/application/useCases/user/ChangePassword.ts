import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";
import { AppError } from "../../../errors/AppError";

export class ChangePassword {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isCurrentPasswordValid =
      await this.passwordHasher.comparePassword(
        currentPassword,
        user.password
      );

    if (!isCurrentPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }

    const hashedPassword =
      await this.passwordHasher.hashPassword(newPassword);

    await this.userRepository.updatePassword(
      user.id,
      hashedPassword
    );
  }
}