import { z } from "zod";

export const matchQuerySchema = z.object({
  team: z.string().min(1).optional(),

  upcoming: z.coerce.boolean().optional(),

  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  sort: z.enum(["matchDatetime"]).optional(),

  order: z.enum(["asc", "desc"]).optional(),
});


export const matchIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});