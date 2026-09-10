
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { prisma } from "../database/prisma";

export class PrismaUserRepository implements UserRepository {
    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { phone_number: phoneNumber },
    });
    return user ? new User(user.id, user.name, user.password, user.phone_number, user.role) : null;
  }
  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user.id, user.name, user.password, user.phone_number, user.role) : null;
  }
 async save(user: User): Promise<User> {
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      password: user.password,
      phone_number: user.phoneNumber,
      role: user.role,
    },
  });
  

    return new User(createdUser.id, createdUser.name, createdUser.password, createdUser.phone_number);
}
async updatePassword(
  userId: number,
  hashedPassword: string
): Promise<void> {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
}
}
