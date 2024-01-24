import {
  BadRequestException,
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
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedEntityResponse } from 'src/decorators/api-created-entity-response.decorator';
import { ApiOkEntityResponse } from 'src/decorators/api-ok-entity-response.decorator';
import { CreateUserDto } from 'src/user/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';
import { CreateSessionDto } from './create-session.dto';
import { JoinSessionDto } from './join-session.dto';
import { SessionEntity, SessionStatus } from './session.entity';
import { SessionModel } from './session.model';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  @Post('start')
  @ApiBadRequestResponse()
  @ApiCreatedEntityResponse(SessionEntity)
  async create(@Body() createSessionDto: CreateSessionDto) {
    const session = await this.sessionService.create(createSessionDto);
    return new SingleEntityResponseDto<SessionEntity, SessionModel>(session!);
  }

  @Post('join')
  @ApiNotFoundResponse()
  @ApiCreatedEntityResponse(UserEntity)
  async join(@Body() joinSessionDto: JoinSessionDto) {
    const session = await this.sessionService.findOneByHash(
      joinSessionDto.hash,
    );

    if (!session) {
      throw new NotFoundException(
        'The session does not exist or is no longer active',
      );
    }

    const isNicknameTaken = await this.userService.isNicknameTaken(
      joinSessionDto.nickname,
      session.id,
    );

    if (isNicknameTaken) {
      throw new BadRequestException(
        `"${joinSessionDto.nickname}" is already taken in this session`,
      );
    }

    const user = await this.userService.create(
      new CreateUserDto(
        joinSessionDto.nickname,
        joinSessionDto.role,
        session.id,
      ),
    );

    return new SingleEntityResponseDto<UserEntity, UserModel>(user);
  }

  @Get(':sessionId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(SessionEntity)
  async findOne(@Param('sessionId', ParseIntPipe) sessionId: number) {
    const session = await this.sessionService.findOne(sessionId);

    if (!session || session.status === SessionStatus.Ended) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<SessionEntity, SessionModel>(session);
  }

  @Delete('close/:sessionId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(SessionEntity)
  async close(@Param('sessionId', ParseIntPipe) sessionId: number) {
    const exists = await this.sessionService.exists(sessionId);

    if (!exists) {
      throw new NotFoundException();
    }

    const session = await this.sessionService.close(sessionId);

    return new SingleEntityResponseDto<SessionEntity, SessionModel>(session!);
  }
}
