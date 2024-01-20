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

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return new SingleEntityResponseDto<UserEntity, UserModel>(user);
  }

  @Put('reconnect/:id')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async reconnect(@Param('id', ParseIntPipe) id: number) {
    const exists = await this.userService.exists(id);

    if (!exists) {
      throw new NotFoundException();
    }

    const user = await this.userService.setOnlineStatus(id, true);

    return new SingleEntityResponseDto<UserEntity, UserModel>(user!);
  }

  @Put('disconnect/:id')
  @ApiNotFoundResponse()
  @ApiOkEntityResponse(UserEntity)
  async disconnect(@Param('id', ParseIntPipe) id: number) {
    const exists = await this.userService.exists(id);

    if (!exists) {
      throw new NotFoundException();
    }

    const user = await this.userService.setOnlineStatus(id, false);

    return new SingleEntityResponseDto<UserEntity, UserModel>(user!);
  }
}
