import { Session } from './session.entity';

export type CreateSessionDto = Pick<Session, 'startedByUserId'>;
