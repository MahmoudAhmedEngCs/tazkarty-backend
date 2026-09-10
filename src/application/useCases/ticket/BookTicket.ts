import { AppError } from "../../../errors/AppError";
import { MatchRepository } from "../../../domain/repositories/MatchRepository";
import { SeatRepository } from "../../../domain/repositories/SeatRepository";
import { TicketRepository } from "../../../domain/repositories/TicketRepository";
import { Ticket } from "../../../domain/entities/Ticket";

export class BookTicket {
  constructor(
    private matchRepository: MatchRepository,
    private seatRepository: SeatRepository,
    private ticketRepository: TicketRepository
  ) {}

  async execute(
    userId: number,
    matchId: number,
    sectionName: string,
    seatName: string
  ): Promise<Ticket> {
    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw new AppError("Match not found", 404);
    }
const userTickets = await this.ticketRepository.findByUserAndMatch(
  userId,
  matchId
);

if (userTickets.length > 0) {
  throw new AppError(
    "You can only book one ticket for this match",
    409
  );
}
    const availableSeats =
      await this.seatRepository.findByMatchIdAndSectionName(
        matchId,
        sectionName
      );

    const seatExists = availableSeats.some(
      (seat) => seat.name === seatName
    );

    if (!seatExists) {
      throw new AppError(
        "Seat not found or already booked",
        409
      );
    }

    const existingTicket =
      await this.ticketRepository.findByMatchAndSeat(
        matchId,
        match.stadiumName,
        sectionName,
        seatName
      );

    if (existingTicket) {
      throw new AppError("Seat is already booked", 409);
    }

    const ticket = new Ticket(
      0,
      userId,
      matchId,
      seatName,
      sectionName,
      match.stadiumName
    );

    return this.ticketRepository.save(ticket);
  }
}