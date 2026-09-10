import { Match } from "../../../domain/entities/Match";
import {
  MatchRepository,
  MatchQueryOptions,
} from "../../../domain/repositories/MatchRepository";

export class GetAllMatches {
  constructor(
    private matchRepository: MatchRepository
  ) {}

  async execute(
    options?: MatchQueryOptions
  ): Promise<Match[]> {
    return this.matchRepository.findAll(options);
  }
}