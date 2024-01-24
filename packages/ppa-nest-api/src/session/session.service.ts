import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as crypto from 'crypto';
import { Sequelize } from 'sequelize-typescript';
import { RoundService } from 'src/round/round.service';
import { UserService } from 'src/user/user.service';
import { CreateSessionDto } from './create-session.dto';
import { SessionStatus } from './session.entity';
import { SessionModel } from './session.model';
import { CreateRoundDto } from 'src/round/dto/create-round.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionModel)
    private readonly sessionModel: typeof SessionModel,
    private readonly userService: UserService,
    private readonly roundService: RoundService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(sessionDto: CreateSessionDto) {
    const transaction = await this.sequelize.transaction();

    try {
      // create a new session
      const newSession = await this.sessionModel.create(
        { startedByUserId: null },
        { transaction },
      );

      // create session organizer
      const organizer = await this.userService.create(
        {
          nickname: sessionDto.nickname,
          role: sessionDto.role,
          sessionId: newSession.id,
        },
        transaction,
      );

      // create a simple md5 hash for this session
      const hash = crypto
        .createHash('shake256', { outputLength: 3 })
        .update(`${organizer.nickname}|${newSession.id}`)
        .digest('hex')
        .toUpperCase();

      // set session organizer
      await this.sessionModel.update(
        {
          startedByUserId: organizer.id,
          hash,
        },
        {
          where: { id: newSession.id },
          transaction,
        },
      );

      // create first round
      await this.roundService.create(
        newSession!.id,
        new CreateRoundDto(false),
        transaction,
      );

      // get updated session with all information
      const session = await this.sessionModel.findOne({
        include: { all: true },
        where: { id: newSession.id },
        transaction,
      });

      // commit transaction
      await transaction.commit();

      return session;
    } catch (e) {
      // rollback transaction on error
      await transaction.rollback();
      throw e;
    }
  }

  findOne(id: number) {
    return this.sessionModel.findOne({
      include: { all: true },
      where: { id },
    });
  }

  findOneByHash(hash: string) {
    return this.sessionModel.findOne({
      where: { hash, status: SessionStatus.Active },
    });
  }

  async exists(id: number) {
    const count = await this.sessionModel.count({
      where: {
        id,
        status: SessionStatus.Active,
      },
    });

    return count > 0;
  }

  async close(id: number) {
    await this.sessionModel.update(
      { status: SessionStatus.Ended },
      { where: { id } },
    );

    return this.findOne(id);
  }
}
