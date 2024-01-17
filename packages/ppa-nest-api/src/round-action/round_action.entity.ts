import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Round, RoundModel } from 'src/round/round.entity';
import { User, UserModel } from 'src/user/user.entity';

export interface RoundAction {
  id: number;
  vote: string;
  comment: string;
  userId: number;
  roundId: number;
  user: User;
  round: Round;
}

@Table
export class RoundActionModel extends Model implements RoundAction {
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
}
