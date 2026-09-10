import { Request, Response } from "express";

export class GetCurrentUserController {
  async execute(req: Request, res: Response) {
    return res.status(200).json({
      user: {
        id: req.user!.id,
        name: req.user!.name,
        phoneNumber: req.user!.phoneNumber,
      },
    });
  }
}