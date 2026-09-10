import { Match } from "../entities/Match";

export interface MatchQueryOptions {
  team?: string;
  upcoming?: boolean;
   sort?: "matchDatetime";
  order?: "asc" | "desc";
    page?: number;
  limit?: number;
}

export interface MatchRepository {
findAll(options?: MatchQueryOptions): Promise<Match[]>;

  findById(id: number): Promise<Match | null>;
}