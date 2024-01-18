import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './create-user.dto';
import { UserModel } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private user: typeof UserModel,
  ) {}

  create(user: CreateUserDto) {
    return this.user.create(user);
  }

  findOne(id: number) {
    return this.user.findOne({ where: { id } });
  }

  disconnect(id: number) {
    return this.user.update({ online: false }, { where: { id } });
  }
}
