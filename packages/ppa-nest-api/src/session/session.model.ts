import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoundModel } from 'src/round/round.model';
import { UserModel } from 'src/user/user.model';
import { BaseModel } from 'src/util/base.model';
import { SessionEntity, SessionStatus } from './session.entity';

@Table
export class SessionModel extends BaseModel<SessionEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  hash: string;

  @Column({ defaultValue: SessionStatus.Active })
  status: SessionStatus;

  @Column
  @ForeignKey(() => UserModel)
  startedByUserId: number;

  @BelongsTo(() => UserModel)
  startedBy: UserModel;

  @HasMany(() => RoundModel)
  rounds: RoundModel[];

  @HasMany(() => UserModel)
  members: UserModel[];

  toEntity(): SessionEntity {
    return new SessionEntity(
      this.id,
      this.hash,
      this.status,
      this.startedByUserId,
      this.startedBy?.toEntity(),
      this.rounds?.map((round) => round.toEntity()),
      this.members?.map((member) => member.toEntity()),
    );
  }
}
