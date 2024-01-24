import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoundActionModel } from 'src/round-action/round-action.model';
import { SessionModel } from 'src/session/session.model';
import { BaseModel } from 'src/util/base.model';
import { RoundEntity, RoundStatus } from './round.entity';

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

  toEntity(): RoundEntity {
    return new RoundEntity(
      this.id,
      this.name,
      this.topic,
      this.status,
      this.endedAt,
      this.sessionId,
      this.isFollowUpRound,
      this.session?.toEntity(),
      this.actions?.map((action) => action.toEntity()),
    );
  }
}
