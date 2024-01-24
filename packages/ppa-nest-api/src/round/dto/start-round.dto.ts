import { IsNotEmpty, Length } from 'class-validator';

export class StartRoundDto {
  @IsNotEmpty()
  @Length(1, 100)
  topic: string;
}
