import { SessionEntity } from 'src/session/session.entity';

export enum UserRole {
  Participant = 'participant',
  Observer = 'observer',
}

export class UserEntity {
  public id: number;
  public nickname: string;
  public role: UserRole;
  public sessionId: number;
  public online: boolean;
  public session?: SessionEntity;

  constructor(
    id: number,
    nickname: string,
    role: UserRole,
    sessionId: number,
    online: boolean,
    session?: SessionEntity,
  ) {
    this.id = id;
    this.nickname = nickname;
    this.role = role;
    this.online = online;
    this.sessionId = sessionId;
    this.session = session;
  }
}
