import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoundActionService } from 'src/round-action/round-action.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { StartRoundDto } from './dto/start-round.dto';
import { RoundStatus } from './round.entity';
import { RoundModel } from './round.model';
import { Transaction } from 'sequelize';
import { RoundVoteCountEntity } from './round-vote-count.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(RoundModel)
    private roundModel: typeof RoundModel,
    private roundActionService: RoundActionService,
  ) {}

  async create(
    sessionId: number,
    createRoundDto: CreateRoundDto,
    transaction?: Transaction,
  ) {
    let count = await this.roundModel.count({
      where: {
        sessionId,
        isFollowUpRound: false,
      },
      transaction,
    });

    count += createRoundDto.isFollowUpRound ? 0 : 1;

    return await this.roundModel.create(
      {
        sessionId,
        name: `Round #${count}`,
        isFollowUpRound: createRoundDto.isFollowUpRound,
      },
      { transaction },
    );
  }

  async createAndRetrieve(sessionId: number, createRoundDto: CreateRoundDto) {
    const round = await this.create(sessionId, createRoundDto);

    return this.findOne(round.id);
  }

  async start(roundId: number, startRoundDto: StartRoundDto) {
    await this.roundModel.update(
      {
        topic: startRoundDto.topic,
        status: RoundStatus.Started,
        startedAt: new Date(),
      },
      { where: { id: roundId } },
    );

    return this.findOne(roundId);
  }

  async reveal(roundId: number) {
    await this.roundModel.update(
      {
        status: RoundStatus.Ended,
        endedAt: new Date(),
      },
      { where: { id: roundId } },
    );

    return this.findOne(roundId);
  }

  async findOne(roundId: number) {
    const round = (await this.roundModel.findOne({
      include: { all: true },
      where: { id: roundId },
    }))!;

    round!.votes = await this.getRoundVotes(round!.id);

    return round;
  }

  async findCurrentOne(sessionId: number) {
    const round = await this.roundModel.findOne({
      include: { all: true },
      where: { sessionId },
      order: [['createdAt', 'ASC']],
      limit: 1,
    });

    if (round) {
      round.votes = await this.getRoundVotes(round.id);
    }

    return round;
  }

  async getRoundVotes(roundId: number) {
    const [votes] = await this.roundActionService.findVoteCount(roundId);

    return (votes || []).map(
      (data: RoundVoteCountEntity) =>
        new RoundVoteCountEntity(data.vote, data.count),
    );
  }

  async exists(roundId: number) {
    const count = await this.roundModel.count({ where: { id: roundId } });
    return count > 0;
  }
}
