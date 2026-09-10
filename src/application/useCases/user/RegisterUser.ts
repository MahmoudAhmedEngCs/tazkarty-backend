import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { JwtService } from "../../../domain/services/JwtService";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";
import { AppError } from "../../../errors/AppError";

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private jwtService: JwtService
  ) {}
  

  async execute(
    name: string,
    phoneNumber: string,
    password: string
  ): Promise<{ user: User; token: string }> {


    const existingUser =
      await this.userRepository.findByPhoneNumber(phoneNumber);

  

    if (existingUser) {
      console.log("I am inside existingUser IF");

      throw new AppError("Phone number already registered", 400);
    }



    const hashedPassword =
      await this.passwordHasher.hashPassword(password);

    const user = new User(
      0,
      name,
      hashedPassword,
      phoneNumber
    );

  

    const savedUser =
      await this.userRepository.save(user);



    const token = this.jwtService.generateToken({
      userId: savedUser.id,
    });


    return {
      user: savedUser,
      token,
    };
  }
}