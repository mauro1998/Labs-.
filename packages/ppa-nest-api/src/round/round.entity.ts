import { SessionEntity } from 'src/session/session.entity';
import { RoundVoteCountEntity } from './round-vote-count.entity';

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
  public startedAt: Date;
  public endedAt: Date;
  public sessionId: number;
  public isFollowUpRound: boolean;
  public session?: SessionEntity;
  public votes: RoundVoteCountEntity[];

  constructor(
    id: number,
    name: string,
    topic: string,
    status: RoundStatus,
    startedAt: Date,
    endedAt: Date,
    sessionId: number,
    isFollowUpRound: boolean,
    votes: RoundVoteCountEntity[] = [],
    session?: SessionEntity,
  ) {
    this.id = id;
    this.name = name;
    this.topic = topic;
    this.status = status;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.sessionId = sessionId;
    this.isFollowUpRound = isFollowUpRound;
    this.session = session;
    this.votes = votes;
  }
}
