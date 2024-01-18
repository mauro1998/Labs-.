import { RoundAction } from './round_action.entity';

export type CreateRoundActionDto = Pick<
  RoundAction,
  'roundId' | 'userId' | 'vote' | 'comment'
>;
