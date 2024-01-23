import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedEntityResponse } from 'src/decorators/api-created-entity-response.decorator';
import { ApiOkEntityResponse } from 'src/decorators/api-ok-entity-response.decorator';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';
import { CreateSessionDto } from './create-session.dto';
import { SessionEntity, SessionStatus } from './session.entity';
import { SessionModel } from './session.model';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiCreatedEntityResponse(SessionEntity)
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async create(@Body() createSessionDto: CreateSessionDto) {
    const session = await this.sessionService.create(createSessionDto);
    return new SingleEntityResponseDto<SessionEntity, SessionModel>(session!);
  }

  @Get(':id')
  @ApiOkEntityResponse(SessionEntity)
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const session = await this.sessionService.findOne(id);

    if (!session || session.status === SessionStatus.Ended) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<SessionEntity, SessionModel>(session);
  }

  @Delete(':id')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.sessionService.close(id);
  }
}
