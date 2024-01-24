import { RoundEntity } from './round.entity';

export type CreateRoundDto = Pick<
  RoundEntity,
  'name' | 'sessionId' | 'topic' | 'isFollowUpRound'
>;
