import { Seat } from "../entities/Seat";

export interface SeatRepository {
  findByMatchIdAndSectionName(
    matchId: number,
    sectionName: string
  ): Promise<Seat[]>;
}