import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedEntityResponse } from 'src/decorators/api-created-entity-response.decorator';
import { ApiOkEntityResponse } from 'src/decorators/api-ok-entity-response.decorator';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';
import { CreateRoundDto } from './dto/create-round.dto';
import { StartRoundDto } from './dto/start-round.dto';
import { RoundEntity, RoundStatus } from './round.entity';
import { RoundModel } from './round.model';
import { RoundService } from './round.service';

@ApiTags('Round')
@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post(':sessionId')
  @ApiBadRequestResponse()
  @ApiCreatedEntityResponse(RoundEntity)
  async create(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Body() createRoundDto: CreateRoundDto,
  ) {
    const currentRound = await this.roundService.findCurrentOne(sessionId);

    if (currentRound && currentRound.status !== RoundStatus.Ended) {
      throw new BadRequestException(
        "There's a round in progress for this session",
      );
    }

    const round = await this.roundService.createAndRetrieve(
      sessionId,
      createRoundDto,
    );

    return new SingleEntityResponseDto<RoundEntity, RoundModel>(round!);
  }

  @Get(':roundId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(RoundEntity)
  async findOne(@Param('roundId', ParseIntPipe) roundId: number) {
    const round = await this.roundService.findOne(roundId);

    if (!round) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<RoundEntity, RoundModel>(round);
  }

  @Get('current/:sessionId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(RoundEntity)
  async findCurrentOne(@Param('sessionId', ParseIntPipe) sessionId: number) {
    const round = await this.roundService.findCurrentOne(sessionId);

    if (!round) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<RoundEntity, RoundModel>(round);
  }

  @Put(':roundId/start')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(RoundEntity)
  async startRound(
    @Param('roundId', ParseIntPipe) roundId: number,
    @Body() startRoundDto: StartRoundDto,
  ) {
    const exists = this.roundService.exists(roundId);

    if (!exists) {
      throw new NotFoundException();
    }

    const round = await this.roundService.start(roundId, startRoundDto);

    return new SingleEntityResponseDto<RoundEntity, RoundModel>(round!);
  }

  @Put(':roundId/reveal')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(RoundEntity)
  async revealRound(@Param('roundId', ParseIntPipe) roundId: number) {
    const exists = this.roundService.exists(roundId);

    if (!exists) {
      throw new NotFoundException();
    }

    const round = await this.roundService.reveal(roundId);

    return new SingleEntityResponseDto<RoundEntity, RoundModel>(round!);
  }
}
