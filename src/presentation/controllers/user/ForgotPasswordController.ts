import { Request, Response } from "express";
import { ForgotPassword } from "../../../application/useCases/user/ForgotPassword";

export  class ForgotPasswordController {
  constructor(
    private forgotPasswordUseCase: ForgotPassword
  ) {}

  async execute(req: Request, res: Response) {
    const { phoneNumber } = req.body;

    const message =
      await this.forgotPasswordUseCase.execute(phoneNumber);

    return res.status(200).json({
      message,
    });
  }
}