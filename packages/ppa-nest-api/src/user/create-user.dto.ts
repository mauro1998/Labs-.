import { User } from './user.entity';

export type CreateUserDto = Pick<User, 'nickname' | 'role' | 'sessionId'>;
