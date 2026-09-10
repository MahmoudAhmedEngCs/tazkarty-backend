import { GetMatchById } from "../../../application/useCases/match/GetMatchById";
import { Request, Response } from "express";


export class GetMatchByIdController {
    constructor(
        private getMatchById: GetMatchById
    ) {}
    async execute(req: Request, res: Response) {
          const id = Number(req.params.id);
        const match = await this.getMatchById.execute(id);
        return res.status(200).json({
            match,
        });
    }}