import { Request, Response } from "express";
import { GetAvailableSeatsForMatchSection } from "../../../application/useCases/seat/GetAvailableSeatsForMatchSection";

export class GetAvailableSeatsForMatchSectionController {
  constructor(
    private getAvailableSeatsForMatchSection: GetAvailableSeatsForMatchSection
  ) {}

  async execute(req: Request, res: Response) {
    const { matchId, sectionName } = req.validated as {
      matchId: number;
      sectionName: string;
    };

    const seats =
      await this.getAvailableSeatsForMatchSection.execute(
        matchId,
        sectionName
      );

    return res.status(200).json({
      seats,
    });
  }
}