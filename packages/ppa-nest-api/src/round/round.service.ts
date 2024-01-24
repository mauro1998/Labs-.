import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoundActionModel } from 'src/round-action/round-action.model';
import { CreateRoundDto } from './create-round.dto';
import { RoundEntity, RoundStatus } from './round.entity';
import { RoundModel } from './round.model';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(RoundModel)
    private round: typeof RoundModel,
  ) {}

  create(round: CreateRoundDto) {
    return this.round.create(round);
  }

  findOne(id: number) {
    return this.round.findOne({
      include: [RoundActionModel],
      where: { id },
    });
  }

  updateTopic(id: number, topic: string) {
    return this.round.update({ topic }, { where: { id } });
  }

  updateStatus(id: number, status: RoundStatus) {
    const updatedModel: Partial<RoundEntity> = { status };

    if (status === RoundStatus.Ended) {
      updatedModel.endedAt = new Date();
    }

    return this.round.update(updatedModel, { where: { id } });
  }
}
