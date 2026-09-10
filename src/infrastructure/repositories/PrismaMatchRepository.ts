import { Match } from "../../domain/entities/Match";
import { MatchQueryOptions, MatchRepository } from "../../domain/repositories/MatchRepository";
import { prisma } from "../database/prisma";


export class PrismaMatchRepository implements MatchRepository {
async findAll(
  options?: MatchQueryOptions
): Promise<Match[]> {
  const matches = await prisma.football_match.findMany({
    where: {
      ...(options?.team
        ? {
            OR: [
              { home_team_name: options.team },
              { away_team_name: options.team },
            ],
          }
        : {}),

      ...(options?.upcoming !== undefined
        ? options.upcoming
          ? {
              match_datetime: {
                gte: new Date(),
              },
            }
          : {
              match_datetime: {
                lt: new Date(),
              },
            }
        : {}),
    },

    ...(options?.sort
      ? {
          orderBy: {
            match_datetime: options.order ?? "asc",
          },
        }
      : {}),

    ...(options?.page !== undefined &&
    options?.limit !== undefined
      ? {
          skip: (options.page - 1) * options.limit,
          take: options.limit,
        }
      : {}),
  });

  return matches.map(
    (match) =>
      new Match(
        match.id,
        match.match_datetime,
        match.home_team_name,
        match.away_team_name,
        match.stadium_name
      )
  );
}
    async findById(matchId: number): Promise<Match | null> {

        const match = await prisma.football_match.findUnique({
            where: { id: matchId },
        });
        if (!match) return null;

        return new Match(
            match.id,
            match.match_datetime,
            match.home_team_name,
            match.away_team_name,
            match.stadium_name
        );
    }
    // async findByTeamName(teamName: string): Promise<Match[]> {
    //     const matches = await prisma.football_match.findMany({
    //         where: {
    //             OR: [
    //                 { home_team_name: teamName },
    //                 { away_team_name: teamName },
    //             ],
    //         },
    //     });
    //     return matches.map((match) => new Match(
    //         match.id,
    //         match.match_datetime,
    //         match.home_team_name,
    //         match.away_team_name,
    //         match.stadium_name
    //     ));
    // }
}