import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}