import { z } from "zod";

export const matchIdParamSchema = z.object({
  matchId: z.coerce.number().int().positive(),
});

export const matchSectionParamsSchema = z.object({
  matchId: z.coerce.number().int().positive(),
  sectionName: z.string().trim().min(1),
});