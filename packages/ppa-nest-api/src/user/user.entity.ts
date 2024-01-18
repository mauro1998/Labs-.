import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Session, SessionModel } from 'src/session/session.entity';

export enum UserRole {
  Participant = 1,
  Observer = 2,
}

export interface User {
  id: number;
  nickname: string;
  role: UserRole;
  sessionId: number;
  session: Session;
}

@Table
export class UserModel extends Model implements User {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nickname: string;

  @Column
  role: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  online: boolean;

  @Column
  @ForeignKey(() => SessionModel)
  sessionId: number;

  @BelongsTo(() => SessionModel)
  session: SessionModel;
}
