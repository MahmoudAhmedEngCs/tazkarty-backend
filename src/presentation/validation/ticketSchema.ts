import { z } from "zod";

export const bookTicketParamsSchema = z.object({
  matchId: z.coerce.number().int().positive(),
});

export const bookTicketBodySchema = z.object({
  sectionName: z.string().trim().min(1, "Section name is required"),
  seatName: z.string().trim().min(1, "Seat name is required"),
});