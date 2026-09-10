import {User} from '../entities/User';

export interface UserRepository {
    findById(id: number): Promise<User | null>;
    findByPhoneNumber(phoneNumber: string): Promise<User | null>;
    save(user: User): Promise<User >;
    updatePassword(
  userId: number,
  hashedPassword: string
): Promise<void>;
}