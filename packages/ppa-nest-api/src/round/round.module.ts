import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundActionModule } from 'src/round-action/round-action.module';
import { RoundController } from './round.controller';
import { RoundModel } from './round.model';
import { RoundService } from './round.service';

@Module({
  imports: [
    SequelizeModule.forFeature([RoundModel]),
    forwardRef(() => RoundActionModule),
  ],
  controllers: [RoundController],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
