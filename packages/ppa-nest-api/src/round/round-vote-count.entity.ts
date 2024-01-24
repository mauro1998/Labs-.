export class RoundVoteCountEntity {
  public vote: string;
  public count: number;

  constructor(vote: string, count: number) {
    this.vote = vote;
    this.count = count;
  }
}
