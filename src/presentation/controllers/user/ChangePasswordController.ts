import { Request, Response } from "express";
import { ChangePassword } from "../../../application/useCases/user/ChangePassword";

export class ChangePasswordController {
  constructor(
    private changePassword: ChangePassword
  ) {}

  async execute(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body;

    await this.changePassword.execute(
      req.user!.id,
      currentPassword,
      newPassword
    );

    return res.status(200).json({
      message: "Password changed successfully",
    });
  }
}