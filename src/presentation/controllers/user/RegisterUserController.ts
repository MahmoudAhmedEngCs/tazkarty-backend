import { Request, Response } from "express";
import { RegisterUser } from "../../../application/useCases/user/RegisterUser";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async execute(req: Request, res: Response) {
    const { name, phoneNumber, password } = req.body;

    const result = await this.registerUser.execute(name, phoneNumber, password);

    return res.status(201).json({
      user: {
        id: result.user.id,
        name: result.user.name,
        phoneNumber: result.user.phoneNumber,
      },
      token: result.token,
    });
  }
}
