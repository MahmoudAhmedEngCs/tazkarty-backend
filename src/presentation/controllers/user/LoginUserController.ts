import { Request, Response } from "express";
import { LoginUser } from "../../../application/useCases/user/LoginUser";

export class LoginUserController {
  constructor(private loginUser: LoginUser) {}

  async execute(req: Request, res: Response) {
    const { phoneNumber, password } = req.body;

    const result = await this.loginUser.execute(phoneNumber, password);

    return res.status(200).json({
      user: {
        id: result.user.id,
        name: result.user.name,
        phoneNumber: result.user.phoneNumber,
      },
      token: result.token,
    });
  }
}
