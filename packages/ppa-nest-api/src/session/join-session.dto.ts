import {
  IsEnum,
  IsHexadecimal,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { UserRole } from '../user/user.entity';

export class JoinSessionDto {
  @IsNotEmpty()
  @Length(2, 30)
  @Matches(/^[a-z]+[a-z0-9\s]*$/i)
  nickname: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  // generic error message to prevent exposing the nature of the hash
  @Length(6, 6, { message: 'Invalid hash length' })
  @IsHexadecimal({ message: 'Invalid hash format' })
  hash: string;
}
