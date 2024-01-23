import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SessionModel } from 'src/session/session.model';
import { BaseModel } from 'src/util/base.model';
import { UserEntity, UserRole } from './user.entity';

@Table
export class UserModel extends BaseModel<UserEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nickname: string;

  @Column
  role: UserRole;

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

  toEntity(): UserEntity {
    return new UserEntity(
      this.id,
      this.nickname,
      this.role,
      this.sessionId,
      this.session?.toEntity(),
    );
  }
}
