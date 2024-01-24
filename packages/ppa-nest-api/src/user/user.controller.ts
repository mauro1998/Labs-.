import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkEntityResponse } from 'src/decorators/api-ok-entity-response.decorator';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<UserEntity, UserModel>(user);
  }

  @Put('reconnect/:userId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async reconnect(@Param('userId', ParseIntPipe) userId: number) {
    const exists = await this.userService.exists(userId);

    if (!exists) {
      throw new NotFoundException();
    }

    const user = await this.userService.setOnlineStatus(userId, true);

    return new SingleEntityResponseDto<UserEntity, UserModel>(user!);
  }

  @Put('disconnect/:userId')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async disconnect(@Param('userId', ParseIntPipe) userId: number) {
    const exists = await this.userService.exists(userId);

    if (!exists) {
      throw new NotFoundException();
    }

    const user = await this.userService.setOnlineStatus(userId, false);

    return new SingleEntityResponseDto<UserEntity, UserModel>(user!);
  }
}
