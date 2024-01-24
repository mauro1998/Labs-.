import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { SessionController } from './session.controller';
import { SessionModel } from './session.model';
import { SessionService } from './session.service';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([SessionModel])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
