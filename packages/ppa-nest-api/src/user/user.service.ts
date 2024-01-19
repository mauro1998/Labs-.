import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { CreateUserDto } from './create-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private user: typeof UserModel,
  ) {}

  create(user: CreateUserDto, transaction?: Transaction) {
    return this.user.create(
      {
        nickname: user.nickname,
        role: user.role,
        sessionId: user.sessionId,
      },
      { transaction },
    );
  }

  findOne(id: number) {
    return this.user.findOne({ where: { id } });
  }

  disconnect(id: number) {
    return this.user.update({ online: false }, { where: { id } });
  }
}
