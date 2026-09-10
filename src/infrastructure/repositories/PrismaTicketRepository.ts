import { Ticket } from "../../domain/entities/Ticket";
import { TicketRepository } from "../../domain/repositories/TicketRepository";
import { prisma } from "../database/prisma";


export class PrismaTicketRepository implements TicketRepository {
  async findByMatchAndSeat(
    matchId: number,
    stadiumName: string,
    sectionName: string,
    seatName: string
  ): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findFirst({
      where: {
        match_id: matchId,
        stadium_name: stadiumName,
        section_name: sectionName,
        seat_name: seatName,
      },
    });

    if (!ticket) {
      return null;
    }

    return new Ticket(
      ticket.id,
      ticket.user_id,
      ticket.match_id,
      ticket.seat_name,
      ticket.section_name,
      ticket.stadium_name
    );
  }

  async save(ticket: Ticket): Promise<Ticket> {
    const createdTicket = await prisma.ticket.create({
      data: {
        user_id: ticket.userId,
        match_id: ticket.matchId,
        seat_name: ticket.seatName,
        section_name: ticket.sectionName,
        stadium_name: ticket.stadiumName,
      },
    });

    return new Ticket(
      createdTicket.id,
      createdTicket.user_id,
      createdTicket.match_id,
      createdTicket.seat_name,
      createdTicket.section_name,
      createdTicket.stadium_name
    );
  }

  async findByUserAndMatch(
    userId: number,
    matchId: number
  ): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: {
        user_id: userId,
        match_id: matchId,
      },
    });

    return tickets.map(
      (ticket) =>
        new Ticket(
          ticket.id,
          ticket.user_id,
          ticket.match_id,
          ticket.seat_name,
          ticket.section_name,
          ticket.stadium_name
        )
    );
  }

  async delete(ticketId: number): Promise<void> {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
  }
}