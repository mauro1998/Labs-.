import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Session, SessionModel } from '../session/session.entity';
import {
  RoundAction,
  RoundActionModel,
} from 'src/round-action/round_action.entity';

export enum RoundStatus {
  NotStarted = 0,
  Started = 1,
  Ended = 2,
}

export interface Round {
  id: number;
  name: string;
  topic: string;
  status: RoundStatus;
  endedAt: Date;
  sessionId: number;
  isFollowUpRound: boolean;
  session: Session;
  actions: RoundAction[];
}

@Table
export class RoundModel extends Model implements Round {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  topic: string;

  @Column({ defaultValue: RoundStatus.NotStarted })
  status: number;

  @Column
  endedAt: Date;

  @Column({ defaultValue: false })
  isFollowUpRound: boolean;

  @Column
  @ForeignKey(() => SessionModel)
  sessionId: number;

  @BelongsTo(() => SessionModel)
  session: SessionModel;

  @HasMany(() => RoundActionModel)
  actions: RoundActionModel[];
}
