import { Match } from "../../../domain/entities/Match";
import { MatchRepository } from "../../../domain/repositories/MatchRepository";


export class GetMatchById {
  constructor(private matchRepository: MatchRepository) {}
async execute(matchId: number): Promise<Match | null> {
    return this.matchRepository.findById(matchId);
  }
}