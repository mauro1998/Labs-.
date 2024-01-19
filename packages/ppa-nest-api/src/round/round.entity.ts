import { RoundActionEntity } from 'src/round-action/round-action.entity';
import { SessionEntity } from 'src/session/session.entity';

export enum RoundStatus {
  NotStarted = 'not_started',
  Started = 'started',
  Ended = 'ended',
}

export class RoundEntity {
  public id: number;
  public name: string;
  public topic: string;
  public status: RoundStatus;
  public endedAt: Date;
  public sessionId: number;
  public isFollowUpRound: boolean;
  public session?: SessionEntity;
  public actions?: RoundActionEntity[];

  constructor(
    id: number,
    name: string,
    topic: string,
    status: RoundStatus,
    endedAt: Date,
    sessionId: number,
    isFollowUpRound: boolean,
    session?: SessionEntity,
    actions?: RoundActionEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.topic = topic;
    this.status = status;
    this.endedAt = endedAt;
    this.sessionId = sessionId;
    this.isFollowUpRound = isFollowUpRound;
    this.session = session;
    this.actions = actions;
  }
}
