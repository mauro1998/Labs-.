import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { SessionController } from './session.controller';
import { SessionModel } from './session.model';
import { SessionService } from './session.service';
import { RoundModule } from 'src/round/round.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SessionModel]),
    UserModule,
    RoundModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
