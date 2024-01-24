import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedEntityResponse } from 'src/decorators/api-created-entity-response.decorator';
import { RoundStatus } from 'src/round/round.entity';
import { RoundService } from 'src/round/round.service';
import { UserService } from 'src/user/user.service';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';
import { CreateRoundActionDto } from './create-round-action.dto';
import { RoundActionEntity } from './round-action.entity';
import { RoundActionModel } from './round-action.model';
import { RoundActionService } from './round-action.service';
import { ApiOkEntitiesResponse } from 'src/decorators/api-ok-entities-response.decorator';
import { MultipleEntitiesResponseDto } from 'src/util/multiple-entities-response.dto';

@ApiTags('RoundAction')
@Controller('round-action')
export class RoundActionController {
  constructor(
    private readonly roundActionService: RoundActionService,
    private readonly roundService: RoundService,
    private readonly userService: UserService,
  ) {}

  @Post(':roundId')
  @ApiCreatedEntityResponse(RoundActionEntity)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Param('roundId', ParseIntPipe) roundId: number,
    @Body() createRoundActionDto: CreateRoundActionDto,
  ) {
    const userExists = await this.userService.exists(
      createRoundActionDto.userId,
    );

    if (!userExists) {
      throw new NotFoundException();
    }

    const roundExists = await this.roundService.exists(roundId);

    if (!roundExists) {
      throw new NotFoundException();
    }

    const round = await this.roundService.findOne(roundId);

    if (round.status !== RoundStatus.Started) {
      throw new BadRequestException(
        `Round status is "${round.status.toUpperCase()}"`,
      );
    }

    const roundAction = await this.roundActionService.create(
      roundId,
      createRoundActionDto,
    );

    return new SingleEntityResponseDto<RoundActionEntity, RoundActionModel>(
      roundAction!,
    );
  }

  @Get(':roundId')
  @ApiNotFoundResponse()
  @ApiOkEntitiesResponse(RoundActionEntity)
  async findAll(@Param('roundId', ParseIntPipe) roundId: number) {
    const exists = await this.roundService.exists(roundId);

    if (!exists) {
      throw new NotFoundException();
    }

    const actions = await this.roundActionService.findAll(roundId);

    return new MultipleEntitiesResponseDto<RoundActionEntity, RoundActionModel>(
      actions,
    );
  }
}
