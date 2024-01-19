import { RoundActionEntity } from './round-action.entity';

export type CreateRoundActionDto = Pick<
  RoundActionEntity,
  'roundId' | 'userId' | 'vote' | 'comment'
>;
