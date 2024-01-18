import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './create-session.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoundModel } from '../round/round.entity';
import { SessionModel, SessionStatus } from './session.entity';
import { UserModel } from 'src/user/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionModel)
    private session: typeof SessionModel,
  ) {}

  create(session: CreateSessionDto) {
    return this.session.create(session);
  }

  findOne(id: number) {
    return this.session.findOne({
      include: [UserModel, RoundModel],
      where: { id },
    });
  }

  close(id: number) {
    return this.session.update(
      { status: SessionStatus.Ended },
      { where: { id } },
    );
  }
}
