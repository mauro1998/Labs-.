import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserRole } from 'src/user/user.entity';

export class CreateSessionDto {
  @IsNotEmpty()
  @Length(2, 30)
  @Matches(/^[a-z]+[a-z0-9\s]*$/i)
  nickname: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
