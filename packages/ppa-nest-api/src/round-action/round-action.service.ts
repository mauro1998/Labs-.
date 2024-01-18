import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoundActionModel } from './round_action.entity';
import { CreateRoundActionDto } from './create-round-action.dto';
import { UserModel } from 'src/user/user.entity';

@Injectable()
export class RoundActionService {
  constructor(
    @InjectModel(RoundActionModel)
    private round: typeof RoundActionModel,
  ) {}

  create(round: CreateRoundActionDto) {
    return this.round.create(round);
  }

  findAll(roundId: number) {
    return this.round.findAll({
      include: [UserModel],
      where: { roundId },
      order: [['createdAt', 'ASC']],
    });
  }
}
