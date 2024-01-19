import { UserRole } from './user.entity';

export class CreateUserDto {
  nickname: string;
  role: UserRole;
  sessionId: number;
}
