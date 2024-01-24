import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoundActionDto } from './create-round-action.dto';
import { RoundActionModel } from './round-action.model';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class RoundActionService {
  constructor(
    @InjectModel(RoundActionModel)
    private round: typeof RoundActionModel,
    private sequelize: Sequelize,
  ) {}

  create(roundId: number, createRoundActionDto: CreateRoundActionDto) {
    return this.round.create({
      roundId,
      userId: createRoundActionDto.userId,
      vote: createRoundActionDto.vote,
      comment: createRoundActionDto.comment,
    });
  }

  findVoteCount(roundId: number) {
    return this.sequelize.query(`
      SELECT vote, COUNT(vote) AS count
      FROM RoundActionModels
      WHERE roundId = ${roundId} AND (id, createdAt) IN (
        SELECT id, MAX(createdAt) as createdAt
        FROM RoundActionModels
        WHERE roundId = ${roundId}
        GROUP BY userId
        ORDER BY createdAt ASC
      )
      GROUP BY vote
    `);
  }

  findAll(roundId: number) {
    return this.round.findAll({
      include: [UserModel],
      where: { roundId },
      order: [['createdAt', 'ASC']],
    });
  }
}
