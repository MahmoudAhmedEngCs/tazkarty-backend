import { Request, Response } from "express";
import { GetAllMatches } from "../../../application/useCases/match/GetAllMatches";

export class GetAllMatchesController {
  constructor(
    private getAllMatches: GetAllMatches
  ) {}

  async execute(req: Request, res: Response) {
    const {
      team,
      upcoming,
      page,
      limit,
      sort,
      order,
    } = req.validated as {
      team?: string;
      upcoming?: boolean;
      page: number;
      limit: number;
      sort?: "matchDatetime";
      order?: "asc" | "desc";
    };

    const matches = await this.getAllMatches.execute({
      team,
      upcoming,
      page,
      limit,
      sort,
      order,
    });

    return res.status(200).json({
      matches,
    });
  }
}