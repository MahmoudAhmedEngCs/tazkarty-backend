import { Section } from "../../domain/entities/Section";
import { SectionRepository } from "../../domain/repositories/SectionRepository";
import { prisma } from "../database/prisma";

export class PrismaSectionRepository implements SectionRepository {
  async findByMatchId(matchId: number): Promise<Section[]> {
    const match = await prisma.football_match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        stadium: {
          include: {
            section: true,
          },
        },
      },
    });

    if (!match) {
      return [];
    }

    return match.stadium.section.map(
      (section) =>
        new Section(
          section.stadium_name,
          section.name,
          Number(section.price)
        )
    );
  }
}