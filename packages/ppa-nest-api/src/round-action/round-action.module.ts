import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundModule } from 'src/round/round.module';
import { UserModule } from 'src/user/user.module';
import { RoundActionController } from './round-action.controller';
import { RoundActionModel } from './round-action.model';
import { RoundActionService } from './round-action.service';

@Module({
  imports: [
    SequelizeModule.forFeature([RoundActionModel]),
    forwardRef(() => RoundModule),
    UserModule,
  ],
  controllers: [RoundActionController],
  providers: [RoundActionService],
  exports: [RoundActionService],
})
export class RoundActionModule {}
