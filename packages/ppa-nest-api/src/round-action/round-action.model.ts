import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoundModel } from 'src/round/round.model';
import { UserModel } from 'src/user/user.model';
import { BaseModel } from 'src/util/base.model';
import { RoundActionEntity } from './round-action.entity';

@Table
export class RoundActionModel extends BaseModel<RoundActionEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  vote: string;

  @Column
  comment: string;

  @Column
  @ForeignKey(() => UserModel)
  userId: number;

  @Column
  @ForeignKey(() => RoundModel)
  roundId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsTo(() => RoundModel)
  round: RoundModel;

  toEntity(): RoundActionEntity {
    return new RoundActionEntity(
      this.id,
      this.vote,
      this.comment,
      this.userId,
      this.roundId,
      this.createdAt,
      this.user?.toEntity(),
      this.round?.toEntity(),
    );
  }
}
