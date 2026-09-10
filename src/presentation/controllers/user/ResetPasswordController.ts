import { Request, Response } from "express";
import { ResetPassword } from "../../../application/useCases/user/ResetPassword";

export class ResetPasswordController {
  constructor(
    private resetPassword: ResetPassword
  ) {}

  async execute(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    await this.resetPassword.execute(
      token,
      newPassword
    );

    return res.status(200).json({
      message: "Password reset successfully",
    });
  }
}