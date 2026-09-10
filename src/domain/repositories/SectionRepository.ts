import { Section } from "../entities/Section";

export interface SectionRepository {
  findByMatchId(matchId: number): Promise<Section[]>;
}