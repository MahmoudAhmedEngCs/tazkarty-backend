export class Ticket {
  constructor(
    public id: number,
    public userId: number,
    public matchId: number,
    public seatName: string,
    public sectionName: string,
    public stadiumName: string
  ) {}
}