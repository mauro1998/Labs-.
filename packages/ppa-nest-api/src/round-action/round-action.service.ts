import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoundActionDto } from './create-round-action.dto';
import { RoundActionModel } from './round-action.model';
import { UserModel } from 'src/user/user.model';

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
