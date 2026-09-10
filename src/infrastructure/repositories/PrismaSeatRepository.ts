import { Seat } from "../../domain/entities/Seat";
import { SeatRepository } from "../../domain/repositories/SeatRepository";
import { prisma } from "../database/prisma";

export class PrismaSeatRepository implements SeatRepository {
  async findByMatchIdAndSectionName(
    matchId: number,
    sectionName: string
  ): Promise<Seat[]> {
    
    const match = await prisma.football_match.findUnique({
      where: {
        id: matchId,
      },
    });

    if (!match) {
      return [];
    }

    const seats = await prisma.seat.findMany({
      where: {
        stadium_name: match.stadium_name,
        section_name: sectionName,

        ticket: {
          none: {
            match_id: matchId,
          },
        },
      },
    });

    return seats.map(
      (seat) =>
        new Seat(
          seat.name,
          seat.section_name,
          seat.stadium_name
        )
    );
  }
}