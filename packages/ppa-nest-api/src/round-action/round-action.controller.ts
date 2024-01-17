import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoundActionService } from './round-action.service';
import { CreateRoundActionDto } from './create-round-action.dto';

@Controller('round-action')
export class RoundActionController {
  constructor(private readonly roundActionService: RoundActionService) {}

  @Post()
  create(@Body() createRoundDto: CreateRoundActionDto) {
    return this.roundActionService.create(createRoundDto);
  }

  @Get(':roundId')
  findAll(@Param('roundId') roundId: string) {
    return this.roundActionService.findAll(+roundId);
  }
}
