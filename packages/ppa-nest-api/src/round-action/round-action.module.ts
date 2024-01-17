import { Module } from '@nestjs/common';
import { RoundActionController } from './round-action.controller';
import { RoundActionService } from './round-action.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundActionModel } from './round_action.entity';

@Module({
  imports: [SequelizeModule.forFeature([RoundActionModel])],
  controllers: [RoundActionController],
  providers: [RoundActionService],
  exports: [RoundActionService],
})
export class RoundActionModule {}
