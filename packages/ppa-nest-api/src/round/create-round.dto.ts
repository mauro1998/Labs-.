import { Round } from './round.entity';

export type CreateRoundDto = Pick<
  Round,
  'name' | 'sessionId' | 'topic' | 'isFollowUpRound'
>;
