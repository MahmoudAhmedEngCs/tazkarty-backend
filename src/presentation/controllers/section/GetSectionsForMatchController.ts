import { Request, Response } from "express";
import { GetSectionsForMatch } from "../../../application/useCases/section/GetSectionsForMatch";

export class GetSectionsForMatchController {
  constructor(private getSectionsForMatch: GetSectionsForMatch) {}

  async execute(req: Request, res: Response) {
    const { matchId } = req.validated as {
      matchId: number;
    };

    const sections = await this.getSectionsForMatch.execute(matchId);

    return res.status(200).json({
      sections,
    });
  }
}