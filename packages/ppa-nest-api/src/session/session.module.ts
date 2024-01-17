import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionController } from './session.controller';
import { SessionModel } from './session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [SequelizeModule.forFeature([SessionModel])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
