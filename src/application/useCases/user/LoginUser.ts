import { User } from "../../../domain/entities/User";
import { JwtService } from "../../../domain/services/JwtService";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private jwtService: JwtService,
  ) {}
  async execute(
    phoneNumber: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("Invalid phone number or password");
    }
    const isPasswordValid = await this.passwordHasher.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid phone number or password");
    }
    const token = this.jwtService.generateToken({
      userId: user.id,
    });
    return {
      user,
      token,
    };
  }
}
