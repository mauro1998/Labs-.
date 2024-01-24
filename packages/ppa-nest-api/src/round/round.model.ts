import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SessionModel } from 'src/session/session.model';
import { BaseModel } from 'src/util/base.model';
import { RoundEntity, RoundStatus } from './round.entity';
import { RoundVoteCountEntity } from './round-vote-count.entity';

@Table
export class RoundModel extends BaseModel<RoundEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  topic: string;

  @Column({ defaultValue: RoundStatus.NotStarted })
  status: RoundStatus;

  @Column
  startedAt: Date;

  @Column
  endedAt: Date;

  @Column({ defaultValue: false })
  isFollowUpRound: boolean;

  @Column
  @ForeignKey(() => SessionModel)
  sessionId: number;

  @BelongsTo(() => SessionModel)
  session: SessionModel;

  votes: RoundVoteCountEntity[];

  toEntity(): RoundEntity {
    return new RoundEntity(
      this.id,
      this.name,
      this.topic,
      this.status,
      this.startedAt,
      this.endedAt,
      this.sessionId,
      this.isFollowUpRound,
      this.votes,
      this.session?.toEntity(),
    );
  }
}
