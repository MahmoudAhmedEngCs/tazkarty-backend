export class Match {
  constructor(
    public id: number,
    public matchDatetime: Date,
    public homeTeamName: string,
    public awayTeamName: string,
    public stadiumName: string
  ) {}
}