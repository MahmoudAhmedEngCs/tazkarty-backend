import { Ticket } from "../entities/Ticket";
import { Match } from "../entities/Match";

export class TicketCancellationPolicy {
  canCancel(
    ticket: Ticket,
    match: Match,
    currentDate: Date
  ): boolean {
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;

    const timeUntilMatch =
      match.matchDatetime.getTime() - currentDate.getTime();

    return timeUntilMatch >= threeDaysInMilliseconds;
  }
}