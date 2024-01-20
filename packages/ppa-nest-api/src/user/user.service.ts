import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
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
    return this.user.findOne({
      include: { all: true },
      where: { id },
    });
  }

  async isNicknameTaken(nickname: string, sessionId: number) {
    const count = await this.user.count({
      where: {
        nickname: { [Op.like]: `%${nickname}%` },
        sessionId,
      },
    });

    return count > 0;
  }

  async exists(id: number) {
    const count = await this.user.count({
      where: { id },
    });

    return count > 0;
  }

  async setOnlineStatus(id: number, online: boolean) {
    await this.user.update({ online }, { where: { id } });
    return this.findOne(id);
  }
}
