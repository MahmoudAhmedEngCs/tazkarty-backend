export type UserRole = "USER" | "ADMIN";

export class User {
  constructor(
    public id: number,
    public name: string,
    public password: string,
    public phoneNumber: string,
    public role: UserRole = "USER"
  ) {}
}