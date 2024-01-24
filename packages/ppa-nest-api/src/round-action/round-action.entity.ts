import { RoundEntity } from 'src/round/round.entity';
import { UserEntity } from 'src/user/user.entity';

export class RoundActionEntity {
  public id: number;
  public vote: string;
  public comment: string;
  public userId: number;
  public roundId: number;
  public user?: UserEntity;
  public round?: RoundEntity;

  constructor(
    id: number,
    vote: string,
    comment: string,
    userId: number,
    roundId: number,
    user?: UserEntity,
    round?: RoundEntity,
  ) {
    this.id = id;
    this.vote = vote;
    this.comment = comment;
    this.userId = userId;
    this.roundId = roundId;
    this.user = user;
    this.round = round;
  }
}
