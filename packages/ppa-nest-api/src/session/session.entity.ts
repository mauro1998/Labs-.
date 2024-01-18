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
import { RoundModel } from 'src/round/round.entity';
import { User, UserModel } from 'src/user/user.entity';

export enum SessionStatus {
  Active = 1,
  Ended = 0,
}

export interface Session {
  id: number;
  status: SessionStatus;
  startedByUserId: number;
  startedBy: User;
  rounds: RoundModel[];
  members: User[];
}

@Table
export class SessionModel extends Model implements Session {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ defaultValue: SessionStatus.Active })
  status: number;

  @Column
  @ForeignKey(() => UserModel)
  startedByUserId: number;

  @BelongsTo(() => UserModel)
  startedBy: UserModel;

  @HasMany(() => RoundModel)
  rounds: RoundModel[];

  @HasMany(() => UserModel)
  members: UserModel[];
}
