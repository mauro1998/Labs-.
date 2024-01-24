import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  @Matches(/^[a-z]+[a-z0-9\s]*$/i)
  nickname: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  sessionId: number;

  constructor(nickname: string, role: UserRole, sessionId: number) {
    this.nickname = nickname;
    this.role = role;
    this.sessionId = sessionId;
  }
}
