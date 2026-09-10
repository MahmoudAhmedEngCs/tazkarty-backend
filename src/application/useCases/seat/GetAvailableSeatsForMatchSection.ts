import { Seat } from "../../../domain/entities/Seat";
import { SeatRepository } from "../../../domain/repositories/SeatRepository";

export class GetAvailableSeatsForMatchSection {
  constructor(private seatRepository: SeatRepository) {}

  async execute(
    matchId: number,
    sectionName: string
  ): Promise<Seat[]> {
    return this.seatRepository.findByMatchIdAndSectionName(
      matchId,
      sectionName
    );
  }
}