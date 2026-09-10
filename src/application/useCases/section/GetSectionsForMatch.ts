import { Section } from "../../../domain/entities/Section";
import { SectionRepository } from "../../../domain/repositories/SectionRepository";

export class GetSectionsForMatch {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(matchId: number): Promise<Section[]> {
    return this.sectionRepository.findByMatchId(matchId);
  }
}