import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRoundDto {
  @IsNotEmpty()
  @IsBoolean()
  isFollowUpRound: boolean;

  constructor(isFollowUpRound: boolean) {
    this.isFollowUpRound = isFollowUpRound;
  }
}
