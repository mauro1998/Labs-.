import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateRoundActionDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @Length(1, 3)
  vote: string;

  @IsOptional()
  @Length(1, 180)
  comment?: string;
}
