import { Request, Response } from "express";
import { BookTicket } from "../../../application/useCases/ticket/BookTicket";

export class BookTicketController {
  constructor(private bookTicket: BookTicket) {}

  async execute(req: Request, res: Response) {
    const { matchId, sectionName, seatName } = req.validated as {
      matchId: number;
      sectionName: string;
      seatName: string;
    };

    const ticket = await this.bookTicket.execute(
      req.user!.id,
      matchId,
      sectionName,
      seatName
    );

    return res.status(201).json({
      ticket,
    });
  }
}