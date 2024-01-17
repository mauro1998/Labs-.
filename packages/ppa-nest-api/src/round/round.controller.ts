import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoundDto } from './create-round.dto';
import { RoundStatus } from './round.entity';
import { RoundService } from './round.service';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundService.create(createRoundDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundService.findOne(+id);
  }

  @Put(':id/topic')
  updateTopic(@Param('id') id: string, @Body('topic') topic: string) {
    return this.roundService.updateTopic(+id, topic);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: RoundStatus) {
    return this.roundService.updateStatus(+id, status);
  }
}
