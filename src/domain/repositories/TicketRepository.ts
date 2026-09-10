import { Ticket } from "../entities/Ticket";

export interface TicketRepository {
  save(ticket: Ticket): Promise<Ticket>;

  findByMatchAndSeat(
    matchId: number,
    stadiumName: string,
    sectionName: string,
    seatName: string
  ): Promise<Ticket | null>;

  findByUserAndMatch(
    userId: number,
    matchId: number
  ): Promise<Ticket[]>;
  
  delete(ticketId: number): Promise<void>;
}