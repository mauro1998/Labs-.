import { RoundEntity } from 'src/round/round.entity';
import { UserEntity } from 'src/user/user.entity';

export enum SessionStatus {
  Active = 'active',
  Ended = 'ended',
}

export class SessionEntity {
  public id: number;
  public hash: string;
  public status: SessionStatus;
  public startedByUserId: number;
  public startedBy?: UserEntity;
  public rounds?: RoundEntity[];
  public members?: UserEntity[];

  constructor(
    id: number,
    hash: string,
    status: SessionStatus,
    startedByUserId: number,
    startedBy?: UserEntity,
    rounds?: RoundEntity[],
    members?: UserEntity[],
  ) {
    this.id = id;
    this.hash = hash;
    this.status = status;
    this.startedByUserId = startedByUserId;
    this.startedBy = startedBy;
    this.rounds = rounds;
    this.members = members;
  }
}
